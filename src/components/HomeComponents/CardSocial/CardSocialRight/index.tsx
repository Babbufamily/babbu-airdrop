import classNames from "classnames/bind";
import styles from "./CardSocialRight.module.scss";
import ButtonReuse from "../../../Button";
import { useConnection } from "../../../../redux/connection";
import { ChangeEvent, useEffect, useState } from "react";
import { addressWagmi, ITimeLeft } from "../../../../assets/Interface.ts";
import {
  BU_COIN_DECIMAL_BSC,
  calculateTimeLeft,
  defaultDataTimeLeft,
  getToastConfig,
  minimizeText,
  numberWithCommas,
  PRESALE_CONTRACT_ADDRESS,
  raiseStates,
  USDT_CONTRACT_ADDRESS_BSC,
  USDT_DECIMAL_BSC,
} from "../../../../assets/Constant.tsx";
import { formatUnits } from "viem";
import { erc20ABI, useAccount, useContractRead, useNetwork } from "wagmi";
import PreSaleAbi from "../../../../assets/abi/PresaleAbi.json";
import {
  approveAmount,
  buyTokenPresale,
  getCurrentRoundInfo,
  getHistoryPurchaseAmount,
  getIsWhitelisted,
  getUsdtBalance,
} from "../../../../service/Web3/WagmiService.ts";
import { toast, ToastOptions } from "react-toastify";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { waitForTransaction } from "@wagmi/core";
import ModalHowToBuy from "./ModalHowToBuy.tsx";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function CardSocialRight() {
  const { connection, onSetUsdtBalance } = useConnection();
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { openConnectModal } = useConnectModal();
  const navigate = useNavigate();
  const { jwtToken, currentStateInfo, currentState, usdtBalance, userInfo } =
    connection;
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(defaultDataTimeLeft);
  const [countDownTime, setCountDownTime] = useState<number>(
    new Date().getTime()
  );
  const [usdtValue, setUsdtValue] = useState<string>();
  const [buCoinValue, setBuCoinValue] = useState<string>();
  const { address, isConnected } = useAccount();
  const [show, setShow] = useState(false);
  const [totalAmountBuCountPurchase, setTotalAmountPurchase] =
    useState<number>(0);
  const [saleRoundPrice, setSaleRoundPrice] = useState<string>("0");
  const [nextRoundPrice, setNextRoundPrice] = useState<string>("0");
  const [percentUsdtRoundReceived, setPercentUsdtRoundReceived] = useState(0);
  const [targetRaised, setTargetRaised] = useState(0);

  const {
    data: usdtRaised,
    isSuccess: getTotalUsdtRaised,
    refetch: refetchTotalRaised,
  } = useContractRead({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PreSaleAbi,
    functionName: "totalUsdtRaised",
  });

  const { data: maxPurchasePerUser, refetch: rfMaxPurchaseAmount } =
    useContractRead({
      address: PRESALE_CONTRACT_ADDRESS,
      abi: PreSaleAbi,
      functionName: "maxPurchasePerUser",
    });

  const { data: minPurchasePerUser, refetch: rfMinPurchaseAmount } =
    useContractRead({
      address: PRESALE_CONTRACT_ADDRESS,
      abi: PreSaleAbi,
      functionName: "minPurchasePerUser",
    });

  const {
    data: amountAllowance,
    refetch: refetchAmountAllowance,
    isSuccess: getAllowanceSs,
  } = useContractRead({
    address: USDT_CONTRACT_ADDRESS_BSC,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address as addressWagmi, PRESALE_CONTRACT_ADDRESS],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countDownTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    refetchAmountAllowance().then();
    rfMinPurchaseAmount().then();
    refetchTotalRaised().then();
    rfMaxPurchaseAmount().then();
  }, [chain]);

  useEffect(() => {
    getAmountBuCoinPurchase().then();
  }, [address, chain]);

  useEffect(() => {
    if (currentState === 0) return;
    const startTime =
      Number(formatUnits(currentStateInfo?.startRoundTime, 0)) * 1000;
    let nexState = currentState;
    const currentTime = new Date().getTime();
    nexState = startTime > currentTime ? currentState : currentState + 1;
    getCurrentRoundInfo(PRESALE_CONTRACT_ADDRESS, nexState).then((r: any) => {
      setNextRoundPrice(
        (1 / Number(formatUnits(r.saleRoundPrice, 0))).toString()
      );
    });
    getTargetRaised();
  }, [currentState]);

  useEffect(() => {
    if (!currentStateInfo) return setCountDownTime(new Date().getTime());
    const currentTime = new Date().getTime();
    const startTime =
      Number(formatUnits(currentStateInfo?.startRoundTime, 0)) * 1000;
    const endTime =
      Number(formatUnits(currentStateInfo?.endRoundTime, 0)) * 1000;
    if (startTime > currentTime) {
      setCountDownTime(startTime);
      // setText("to");
    }
    if (startTime < currentTime && currentTime < endTime) {
      setCountDownTime(endTime);
      // setText("end");
    }
    const salePrice = Number(formatUnits(currentStateInfo?.saleRoundPrice, 0));
    setSaleRoundPrice((1 / salePrice).toString());
    getPerUsdtRoundReviced();
  }, [currentStateInfo]);

  useEffect(() => {
    if (!currentStateInfo) return;
    const salePrice = Number(formatUnits(currentStateInfo?.saleRoundPrice, 0));
    setUsdtValue(Number(buCoinValue) / salePrice + "");
  }, [buCoinValue]);

  useEffect(() => {
    if (!currentStateInfo) return;
    const salePrice = Number(formatUnits(currentStateInfo?.saleRoundPrice, 0));
    setBuCoinValue(Number(usdtValue) * salePrice + "");
  }, [usdtValue]);

  const handleChangeModal = () => {
    setShow(!show);
  };

  const getTargetRaised = () => {
    let amount = 0;
    for (let i = 0; i <= currentState; i++) {
      amount += raiseStates[i];
    }
    setTargetRaised(amount);
  };

  const getAmountBuCoinPurchase = async () => {
    if (!address) return;
    const res = await getHistoryPurchaseAmount(
      PRESALE_CONTRACT_ADDRESS,
      address
    );
    let amount = 0;
    for (const reElement of res[1]) {
      amount += Number(formatUnits(reElement, BU_COIN_DECIMAL_BSC));
    }
    setTotalAmountPurchase(amount);
  };

  const approve = async () => {
    if (address?.toLowerCase() !== userInfo?.walletAddress?.toLowerCase()) {
      showModal(
        `The connected address does not match the originally registered address ${minimizeText(
          userInfo?.walletAddress
        )}`,
        "Error"
      );
      return;
    }
    if (!Number(usdtValue)) return showModal(`Invalid amount approve`, "Error");
    if (Number(usdtValue) > Number(usdtBalance))
      return showModal(`Not enough USDT`, "Error");
    if (
      Number(formatUnits(amountAllowance as bigint, USDT_DECIMAL_BSC)) <
      Number(usdtValue)
    ) {
      try {
        const res = await approveAmount(
          PRESALE_CONTRACT_ADDRESS,
          USDT_CONTRACT_ADDRESS_BSC,
          usdtValue as string,
          USDT_DECIMAL_BSC
        );
        await waitForTransaction({ hash: res.hash });
        showModal(`Approve amount success. TxHash: ${res.hash}`, "Success");
        await refetchAmountAllowance();
      } catch (e: any) {
        showModal(`${e.toString()}`, "Error");
      }
    }
  };

  const handleBuy = async () => {
    if (await validateBuy()) {
      try {
        const res = await buyTokenPresale(
          PRESALE_CONTRACT_ADDRESS,
          currentState,
          usdtValue as string
        );
        await waitForTransaction({ hash: res.hash });
        await refetchTotalRaised();
        await refetchAmountAllowance();
        const usdtBalance = await getUsdtBalance(
          USDT_CONTRACT_ADDRESS_BSC,
          address as string
        );
        onSetUsdtBalance(Number(formatUnits(usdtBalance, USDT_DECIMAL_BSC)));
        showModal(`Buy Success TxHash ${res.hash}`, "Success");
      } catch (e: any) {
        showModal(`${e.toString()}`, "Error");
      }
    }
  };

  const showModal = (title: string, status: string) => {
    const config = getToastConfig(status);
    toast(title, config as ToastOptions);
  };

  const validateBuy = async () => {
    const usdtNumber = Number(usdtValue);
    if (address?.toLowerCase() !== userInfo?.walletAddress?.toLowerCase()) {
      showModal(
        `The connected address does not match the originally registered address ${minimizeText(
          userInfo?.walletAddress
        )}`,
        "Error"
      );
      return false;
    }
    const maxPurchaseUsdt = Number(
      formatUnits(maxPurchasePerUser as bigint, USDT_DECIMAL_BSC)
    );
    const minPurchaseUsdt = Number(
      formatUnits(minPurchasePerUser as bigint, USDT_DECIMAL_BSC)
    );
    if (usdtNumber > maxPurchaseUsdt) {
      showModal("Max Purchase USDT amount is " + maxPurchaseUsdt, "Error");
      return false;
    }
    if (usdtNumber < minPurchaseUsdt) {
      showModal("Min Purchase USDT amount is " + minPurchaseUsdt, "Error");
      return false;
    }
    if (usdtNumber > usdtBalance) {
      showModal(
        "You do not have enough money to make this transaction",
        "Error"
      );
      return false;
    }
    const checkWhitelisted = await getIsWhitelisted(
      PRESALE_CONTRACT_ADDRESS,
      address as string
    );
    if (!checkWhitelisted) {
      showModal("You are not on the whitelist", "Error");
      return false;
    }
    return true;
  };

  const handleBuyMax = () => {
    const maxPurchase = Number(
      formatUnits(maxPurchasePerUser as bigint, USDT_DECIMAL_BSC)
    );
    if (maxPurchase < Number(usdtBalance)) {
      setUsdtValue(maxPurchase.toString());
    } else {
      setUsdtValue(usdtBalance);
    }
  };

  const handleChangeUsdt = (e: ChangeEvent<HTMLInputElement>) => {
    setUsdtValue(e.target.value);
  };

  const handleChangeBuCoin = (e: ChangeEvent<HTMLInputElement>) => {
    setBuCoinValue(e.target.value);
  };

  const getButtonTitle = () => {
    const startTime =
      Number(formatUnits(currentStateInfo?.startRoundTime || "0", 0)) * 1000;
    if (!jwtToken) {
      return "SIGN IN TO BUY";
    }
    if (!isConnected || !userInfo?.walletAddress) {
      return "CONNECT WALLET TO BUY";
    }
    if (currentState === 0 || startTime > new Date().getTime()) {
      return "NO PRESALE START";
    }
    if (getAllowanceSs) {
      const numberAllowance = Number(
        formatUnits(amountAllowance as bigint, USDT_DECIMAL_BSC)
      );
      if (!Number(usdtValue)) {
        return "BUY NOW";
      }
      if (numberAllowance >= Number(usdtValue)) {
        return "BUY NOW";
      } else {
        return "APPROVE";
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(userInfo?.walletAddress as string)
      .then(() => {
        showModal(`Copied`, "Success");
      });
  };

  const getPerUsdtRoundReviced = () => {
    const roundId = Number(formatUnits(currentStateInfo?.roundId, 0));
    const totalUsdtRoundReceived = Number(
      formatUnits(currentStateInfo?.totalUsdtRoundReceived, USDT_DECIMAL_BSC)
    );
    const percent = (totalUsdtRoundReceived * 100) / raiseStates[roundId];
    setPercentUsdtRoundReceived(percent);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("title")}>
          <div
            className={cx("d-flex align-items-center justify-content-center")}
          >
            <img src="assets/svg/iconTitleBannerLeft.svg" alt="" />
            <span className={cx("title--banner--buyNow")}>BUY NOW</span>
            <img src="assets/svg/IconTitleBannerRight.svg" alt="" />
          </div>
          {/* LAST CHANCE TO BUY! $BUCOIN STAGE {currentState} */}
          <span>BEFORE PRICE INCREASES!</span>
        </div>
        <div>
          <div className={cx("box--main--BUCOIN")}>
            <div
              className={cx(
                "d-flex",
                "align-items-center",
                "justify-content-between"
              )}
            >
              <div className={cx("title--icont")}>
                <img src="assets/svg/LogoIconMainNew.svg" alt="" />
                <span>BUCOIN</span>
                <img src="assets/svg/ArrowTOp.svg" alt="" />
              </div>
              <ButtonReuse
                background={"#000000"}
                boxShadow={" 0px 4px 0px 0px #0000001A"}
                borderRadius={"8px"}
                color={"#fff"}
                fontSize={"16px"}
                fontWeight={"500"}
                padding={"7px 10px"}
                display={"flex"}
                alignItems={"center"}
                onClick={openChainModal}
              >
                Buy with
                {chain?.network === "bsc" && (
                  <img
                    className={cx("ms-2 me-2")}
                    src="assets/svg/BNB.svg"
                    alt=""
                  />
                )}
                {chain?.network === "optimism" && (
                  <img
                    className={cx("ms-2 me-2")}
                    src="assets/svg/op-icon.svg"
                    alt=""
                  />
                )}
                {chain?.network === "arbitrum" && (
                  <img
                    className={cx("ms-2 me-2")}
                    src="assets/svg/ab-icon.svg"
                    alt=""
                  />
                )}
                {chain?.network === "matic" && (
                  <img
                    className={cx("ms-2 me-2")}
                    src="assets/svg/pl-icon.svg"
                    alt=""
                  />
                )}
                {chain?.network === "bsc-testnet" && (
                  <img
                    className={cx("ms-2 me-2")}
                    src="assets/svg/BNB.svg"
                    alt=""
                  />
                )}
                {chain?.nativeCurrency?.name}
              </ButtonReuse>
            </div>
            <div className={cx("communication")}>
              <span style={{ opacity: 0.5 }}> STAGE #1: SOLD OUT.</span>
              <br />
              <span>STAGE #2: BUY IN BEFORE PRICE INCREASES!</span>
            </div>
            <div className={cx("countdown--box")}>
              <div className={cx("row")}>
                <div className={cx("col-3", "text-center")}>
                  <div className={cx("box--time--countdown")}>
                    {timeLeft.days || 0}d
                  </div>
                </div>
                <div className={cx("col-3", "text-center")}>
                  <div className={cx("box--time--countdown")}>
                    {timeLeft.hours || 0}h
                  </div>
                </div>
                <div className={cx("col-3", "text-center")}>
                  <div className={cx("box--time--countdown")}>
                    {timeLeft.minutes || 0}m
                  </div>
                </div>
                <div className={cx("col-3", "text-center")}>
                  <div className={cx("box--time--countdown")}>
                    {timeLeft.seconds || 0}s
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("raised")}>
              <img className={cx("me-2")} src="assets/svg/USD.svg" alt="" />$
              {getTotalUsdtRaised
                ? numberWithCommas(
                    formatUnits(usdtRaised as bigint, USDT_DECIMAL_BSC),
                    2
                  )
                : 0}{" "}
              Raised / ${numberWithCommas(targetRaised.toString(), 0)}
            </div>
            {Number(nextRoundPrice) > 0 && (
              <div className={cx("position-relative")}>
                <ProgressBar
                  className={cx("progress--")}
                  now={percentUsdtRoundReceived}
                  variant="SOME_NAME"
                />
                <div className={cx("text-progress")}>
                  Next Stage Price: ${numberWithCommas(nextRoundPrice, 3)}
                </div>
              </div>
            )}
            {userInfo?.walletAddress && (
              <>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    margin: "20px 0px",
                  }}
                  className={cx(
                    "d-flex align-items-center justify-content-center"
                  )}
                >
                  Your Purchased ={" "}
                  {numberWithCommas(totalAmountBuCountPurchase + "", 2)}{" "}
                  <img src="/assets/svg/LogoIconMainNew.svg" alt="" />
                </div>
                <p
                  style={{ fontSize: "12px", fontWeight: "500" }}
                  className={cx("text-center mb-0")}
                >
                  Refer your friends to participate in the presale
                </p>
                <div className={cx("text-center")}>
                  <button className={cx("btn-coppy")} onClick={handleCopy}>
                    <div className={cx("d-flex align-items-center")}>
                      {minimizeText(userInfo?.walletAddress)}{" "}
                      <img
                        className={cx("ms-2")}
                        src="/assets/svg/IconCoppy.svg"
                        alt=""
                      />
                    </div>
                  </button>
                </div>
              </>
            )}
            <div className={cx("line--BUCOIN--option")}>
              <div className={cx("line--elm")}>
                <div
                  className={cx(
                    "d-flex",
                    "justify-content-center",
                    "align-items-center"
                  )}
                >
                  <span>
                    <ButtonReuse outLine color={"#000000"}>
                      1{" "}
                      <img
                        className={cx("ms-2")}
                        src="assets/svg/LogoIconMainNew.svg"
                        alt=""
                      />
                    </ButtonReuse>{" "}
                  </span>
                  <span>=</span>
                  <span>
                    <ButtonReuse outLine color={"#000000"}>
                      {numberWithCommas(saleRoundPrice)}
                      <img
                        className={cx("ms-2")}
                        src="assets/svg/USD.svg"
                        alt=""
                      />
                    </ButtonReuse>
                  </span>
                </div>
              </div>
            </div>
            {userInfo?.walletAddress && (
              <p style={{ marginBottom: "16px" }} className={cx("text-center")}>
                <strong className={cx("color-strong")}>USDT </strong>Balance: $
                {numberWithCommas(usdtBalance, 3)}
              </p>
            )}
            <div className={cx("row")}>
              <div className={cx("col-6", "text-center")}>
                <ButtonReuse small width={"100%"} color={"#000000"}>
                  <img className={cx("me-3")} src="assets/svg/USD.svg" alt="" />
                  USDT
                </ButtonReuse>
              </div>
              <div className={cx("col-6", "text-center")}>
                <ButtonReuse
                  small
                  width={"100%"}
                  color={"#000000"}
                  disableClass
                >
                  <img
                    className={cx("me-3")}
                    src="assets/svg/CARD.svg"
                    alt=""
                  />
                  Card
                </ButtonReuse>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-6")}>
                <div className={cx("exchange")}>
                  <div
                    style={{ margin: "16px 0px 8px 0px" }}
                    className={cx(
                      "d-flex",
                      "align-items-center",
                      "justify-content-between"
                    )}
                  >
                    <div>
                      <strong>USDT</strong>
                      <span> to pay</span>
                    </div>
                    <div>
                      <ButtonReuse mini onClick={handleBuyMax}>
                        Max
                      </ButtonReuse>
                    </div>
                  </div>
                  <div className={cx("box--input")}>
                    <input
                      type="number"
                      className={cx("input--icon--right")}
                      placeholder="0.05"
                      value={usdtValue}
                      onChange={handleChangeUsdt}
                    />
                    <img
                      className={cx("icon--input")}
                      src="assets/svg/USD.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className={cx("col-6")}>
                <div className={cx("exchange")}>
                  <div
                    style={{ margin: "18px 0px 6px 0px" }}
                    className={cx(
                      "d-flex",
                      "align-items-center",
                      "justify-content-end"
                    )}
                  >
                    <div>
                      <strong>BUCOIN</strong>
                      <span> receive:</span>
                    </div>
                  </div>
                  <div className={cx("box--input")}>
                    <input
                      type="number"
                      className={cx("input--icon--right")}
                      placeholder="0.05"
                      value={buCoinValue}
                      onChange={handleChangeBuCoin}
                    />
                    <img
                      className={cx("icon--input")}
                      src="assets/svg/LogoIconMainNew.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-12")}>
                <ButtonReuse
                  big
                  background={"#000000"}
                  color={"#fff"}
                  margin={"16px 0px"}
                  onClick={async () => {
                    const startTime =
                      Number(
                        formatUnits(currentStateInfo?.startRoundTime || "0", 0)
                      ) * 1000;
                    if (!jwtToken) return;
                    if (!userInfo?.walletAddress) return navigate("/profile");
                    if (!isConnected && openConnectModal)
                      return openConnectModal();
                    if (currentState === 0 || startTime > new Date().getTime())
                      return showModal("No presale start", "Error");
                    if (getAllowanceSs) {
                      const numberAllowance = Number(
                        formatUnits(amountAllowance as bigint, USDT_DECIMAL_BSC)
                      );
                      if (numberAllowance >= Number(usdtValue)) {
                        await handleBuy();
                      } else {
                        await approve();
                      }
                    }
                  }}
                >
                  {getButtonTitle()}
                </ButtonReuse>
              </div>
              <div className={cx("col-12")}>
                <ButtonReuse
                  big
                  background={"#F6F7F2"}
                  color={"#000000"}
                  margin={"0px 0px 16px 0px"}
                  onClick={handleChangeModal}
                >
                  How To BUY?
                  <img className={cx("ms-2")} src="assets/svg/HOW.svg" alt="" />
                </ButtonReuse>
              </div>
            </div>
            <div
              className={cx(
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
            >
              <p className={cx("m-0", "pe-1")}>Powered by</p>
              <img src="assets/svg/Web3icon.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <ModalHowToBuy
        show={show}
        handleChange={handleChangeModal}
        maxPurchaseAmount={maxPurchasePerUser}
        minPurchaseAmount={minPurchasePerUser}
      />
    </div>
  );
}

export default CardSocialRight;
