import classNames from "classnames/bind";
import styles from "./ProfileCpn.module.scss";
import ButtonReuse from "../../../components/Button/index.tsx";
import { useConnection } from "../../../redux/connection/index.ts";
import { useAccount, useNetwork } from "wagmi";
import { SignMessage } from "../../../service/Web3/WagmiService.ts";
import AirDropApi from "../../../axios/AirDropApi.tsx";
import { getToastConfig, minimizeText } from "../../../assets/Constant.tsx";
import queryString from "query-string";
import { useQuery } from "react-query";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast, ToastOptions } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import airDropApi from "../../../axios/AirDropApi.tsx";
import ModalElm from "../../../components/Modal";
import SideBarProfile from "../../../components/SideBarProfile/index.tsx";
import FooterProfile from "../../../components/FooterProfile/index.tsx";

const cx = classNames.bind(styles);

function ProfileCpn() {
  const { onSetUserInfo, connection } = useConnection();
  const { userInfo } = connection;
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [babbuName, setBabbuName] = useState<string>("");
  const inputFile = useRef<HTMLInputElement>(null);

  const { data: kycInfo, isSuccess: getKycInfoSs } = useQuery(
    ["airDropApi.kycInfo"],
    () => AirDropApi.getKycMine(),
    {
      refetchOnWindowFocus: "always",
    }
  );

  const { data: statusActiveTask, isSuccess: getActiveSs } = useQuery(
    ["airDropApi.checkKycTwitter"],
    () => AirDropApi.checkKycTwitter()
  );

  useEffect(() => {
    if (!getKycInfoSs) return;
    if (userInfo?.walletAddress) return;
    if (!isConnected) return;
    handleConnectWeb3().then();
  }, [isConnected]);

  useEffect(() => {
    if (!getKycInfoSs || !getActiveSs) return;
    if (!kycInfo?.data?.twitterUsername || statusActiveTask?.data?.isActive)
      return;
    navigate("/verify_twitter");
  }, [statusActiveTask, kycInfo]);

  useEffect(() => {
    setBabbuName(userInfo?.babbuName);
  }, [userInfo]);

  const updateBabbuProfile = async () => {
    const result = await AirDropApi.updateBabbuName({ babbuName });
    if (result.status === 200) {
      onSetUserInfo(result.data);
      showModal("Update babbu name success", "Success");
    } else {
      if (typeof result.error === "string") {
        showModal(result.error, "Error");
      } else {
        showModal(result.error[0], "Error");
      }
    }
  };

  const showModal = (title: string, status: string) => {
    const config = getToastConfig(status);
    toast(title, config as ToastOptions);
  };

  const handleConnectWeb3 = async () => {
    if (!isConnected && openConnectModal) return openConnectModal();
    const signData = await SignMessage();
    const result = await AirDropApi.connectWeb3({
      ...signData,
      address,
      chainId: chain?.id,
    });
    if (result.status === 200) {
      onSetUserInfo(result.data);
      showModal("Connect to your web3 address successfully", "Success");
      await AirDropApi.addToWhiteList();
    } else {
      if (typeof result.error === "string") {
        showModal(result.error, "Error");
      } else {
        showModal(result.error[0], "Error");
      }
    }
  };

  const kycTwitter = async () => {
    const result = await AirDropApi.kycTwitter();
    if (result.status === 200) {
      const url = result.data.url;
      const parseUrl = queryString.parse(url);
      localStorage.setItem("TwitterLoginStateCode", parseUrl?.state as string);
      window.location.href = url;
    }
  };

  const kycTelegram = async () => {
    // @ts-ignore
    window.Telegram.Login.auth(
      {
        bot_id: "6546635625",
        request_access: true,
      },
      async (data: any) => {
        if (!data) {
          showModal("Connect to your telegram account failed", "Error");
          return;
        }
        const res = await AirDropApi.kycTelegram(data);
        if (res.status === 200) {
          showModal("Connect to your telegram account", "Success");
        } else {
          if (typeof res.error === "string") {
            showModal(res.error, "Error");
          } else {
            showModal(res.error[0], "Error");
          }
        }
        await AirDropApi.addToWhiteList();
      }
    );
  };

  const handleChangeBabbuName = (e: ChangeEvent<HTMLInputElement>) => {
    setBabbuName(e.target.value);
  };

  const handleClick = () => {
    inputFile?.current?.click();
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (files.length < 1) return;
    const lastFile = files[files.length - 1];
    if (!lastFile) return;
    const formData = new FormData();
    formData.append("file", lastFile);
    const resp = await airDropApi.uploadImageFile(formData);
    if (resp.status !== 200)
      return showModal(
        "Change Avatart failed. Please try again later",
        "Error"
      );
    const result = await AirDropApi.updateBabbuName({
      babbuAvatar: resp.data.downloadUrl,
    });
    if (result.status !== 200)
      return showModal(
        "Change Avatart failed. Please try again later",
        "Error"
      );
    onSetUserInfo(result.data);
    showModal("Change Avatar Success", "Success");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div
              className={cx("col-xl-3 col-lg-3 col-md-12  col-sm-12 col-12")}
            >
              <SideBarProfile />
            </div>
            <div
              className={cx(
                "col-xl-9 col-lg-9 col-md-12  col-sm-12 col-12 ps-4 pe-4"
              )}
            >
              <div className={cx("profileCpn")}>
                <div className={cx("pd")}>
                  {address?.toLowerCase() !==
                    userInfo?.walletAddress?.toLowerCase() && (
                    <ButtonReuse btnVerify margin={"0px 0px 10px 0px"}>
                      <div className={cx("d-flex align-items-center")}>
                        <img
                          className={cx("me-3")}
                          src="assets/svg/Warning.svg"
                          alt=""
                        />
                        The connected address does not match the originally
                        registered address{" "}
                        {minimizeText(userInfo?.walletAddress)}
                      </div>
                      <img src="assets/svg/ArrowRight.svg" alt="" />
                    </ButtonReuse>
                  )}
                  {!kycInfo?.data?.isTwitterActive && (
                    <ButtonReuse
                      btnVerify
                      onClick={() => {
                        navigate("/verify_twitter");
                      }}
                    >
                      <div className={cx("d-flex align-items-center")}>
                        <img
                          className={cx("me-3")}
                          src="assets/svg/Warning.svg"
                          alt=""
                        />
                        Cannot claim tokens until you have activated your
                        account!
                      </div>
                      <img src="assets/svg/ArrowRight.svg" alt="" />
                    </ButtonReuse>
                  )}
                  <h5>Edit Profile</h5>
                  <div className={cx("information--user")}>
                    <img
                      src={
                        userInfo?.babbuAvatar
                          ? userInfo?.babbuAvatar
                          : "assets/svg/avartaMyprofile.svg"
                      }
                      style={{ width: 58, height: 58, borderRadius: "50%" }}
                      alt=""
                    />
                    <input
                      type="file"
                      ref={inputFile}
                      style={{ display: "none" }}
                      onChange={handleChangeImage}
                    />
                    <div>
                      <p>
                        {babbuName
                          ? babbuName
                          : `BUID's ${minimizeText(userInfo?._id)}`}
                      </p>
                      <ButtonReuse
                        background={"#000000"}
                        padding={"6px 16px"}
                        color={"#fff"}
                        fontSize={"14px"}
                        fontWeight={"500"}
                        display={"flex"}
                        alignItems={"center"}
                        borderRadius={"12px"}
                        iconLeft={"assets/svg/ChangeAvatar.svg"}
                        onClick={handleClick}
                      >
                        Change Avatar
                      </ButtonReuse>
                    </div>
                  </div>
                  <div className={cx("connect")}>
                    <div>
                      <h3>Social Connection:</h3>
                      <div className={cx("babbu--name--input")}>
                        <input
                          className={cx("w-100", "mw-530")}
                          type="text"
                          value={babbuName}
                          placeholder="babbu_name"
                          onChange={handleChangeBabbuName}
                        />
                      </div>
                    </div>
                    <div className={cx("form--btn--connect")}>
                      <ButtonReuse
                        big
                        background={"#000000"}
                        fontSize={"16px"}
                        fontWeight={"700"}
                        color={"#fff"}
                        onClick={updateBabbuProfile}
                      >
                        Confirm
                      </ButtonReuse>

                      <h3>Social Connection:</h3>
                      {kycInfo?.data?.twitterUsername ? (
                        <ButtonReuse
                          connect={true}
                          color={"#fff"}
                          background={"#000000"}
                          iconRight={"assets/svg/TWBLUE.svg"}
                        >
                          {kycInfo?.data?.twitterUsername}
                        </ButtonReuse>
                      ) : (
                        <ButtonReuse
                          connect
                          iconRight={"assets/svg/TWBLUE.svg"}
                          onClick={kycTwitter}
                        >
                          Connect with Twitter
                        </ButtonReuse>
                      )}
                      {kycInfo?.data?.telegramUsername ? (
                        <ButtonReuse
                          connect={true}
                          color={"#fff"}
                          background={"#000000"}
                          iconRight={"assets/svg/TELEGRAM.svg"}
                        >
                          {kycInfo?.data?.telegramUsername}
                        </ButtonReuse>
                      ) : (
                        <ButtonReuse
                          connect
                          iconRight={"assets/svg/TELEGRAM.svg"}
                          onClick={kycTelegram}
                        >
                          Connect with Telegram
                        </ButtonReuse>
                      )}

                      <h3>Wallet Connection:</h3>
                      {userInfo?.walletAddress ? (
                        <ButtonReuse
                          connect
                          iconRight={"assets/svg/RainbowProfile.svg"}
                          color={"#fff"}
                          background={"#000000"}
                          onClick={() => {
                            if (!isConnected && openConnectModal)
                              return openConnectModal();
                          }}
                        >
                          {isConnected
                            ? minimizeText(address as string)
                            : "Connect Wallet"}
                        </ButtonReuse>
                      ) : (
                        <ButtonReuse
                          connect
                          iconRight={"assets/svg/RainbowProfile.svg"}
                          onClick={handleConnectWeb3}
                        >
                          Connect Wallet
                        </ButtonReuse>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterProfile />
      </div>
      {getKycInfoSs && (
        <ModalElm
          kycTwitter={kycTwitter}
          show={!kycInfo?.data?.twitterUsername}
        />
      )}
    </div>
  );
}

export default ProfileCpn;
