import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import AirDropApi from "../../axios/AirDropApi.tsx";
import { useConnection } from "../../redux/connection";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonReuse from "../../components/Button/index.tsx";
import { SignMessage } from "../../service/Web3/WagmiService.ts";
import { ITimeLeft } from "../../assets/Interface.ts";
import {
  calculateTimeLeft,
  defaultDataTimeLeft,
  getToastConfig,
} from "../../assets/Constant.tsx";
import { useAccount, useNetwork } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import queryString from "query-string";
import { toast, ToastOptions } from "react-toastify";

const cx = classNames.bind(styles);

function Login() {
  const { onSetUserInfo, onSetJwtToken, onSetHomeTabActive } = useConnection();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const navigate = useNavigate();
  const [code, setCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(defaultDataTimeLeft);
  const [countDownTime, setCountDownTime] = useState<number>(
    new Date().getTime()
  );
  const [ran, setRan] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countDownTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (isConnected) {
      sign().then();
    }
  }, [isConnected]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleLogin = async (data: FieldValues) => {
    const result = await AirDropApi.webAuthEmailConfirmation(data);
    console.log(result);
    if (timeLeft.seconds <= 0) return;
    saveData(result);
  };

  const showModal = (title: string, status: string) => {
    const config = getToastConfig(status);
    toast(title, config as ToastOptions);
  };

  const handleGetCode = async (email: string) => {
    const result = await AirDropApi.userAuthWeb(email.trim().toLowerCase());
    if (result.status === 200) {
      showModal(result.data.message, "Success");
      setCountDownTime(new Date().getTime() + 1000 * 60);
      setRan(true);
      setNewUser(result.data.isNewUser);
    } else {
      if (typeof result.error === "string") {
        showModal(result.error, "Error");
      } else {
        showModal(result.error[0], "Error");
      }
    }
  };

  const saveData = (result: any) => {
    if (result.status === 200) {
      onSetJwtToken(result.data.jwt);
      onSetUserInfo(result.data.user);
      showModal("Login success", "Success");
      onSetHomeTabActive(2);
      navigate("/profile");
    } else {
      if (typeof result.error === "string") {
        showModal(result.error, "Error");
      } else {
        showModal(result.error, "Error");
      }
    }
  };

  const loginWithWeb3 = async () => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    } else {
      await sign();
    }
  };

  const sign = async () => {
    const signData = await SignMessage();
    const result = await AirDropApi.loginWithWeb3({
      ...signData,
      chainId: chain?.id,
    });
    AirDropApi.addToWhiteList().then();
    saveData(result);
  };

  const loginWithTwitter = async () => {
    const res = await AirDropApi.loginWithTwitter();
    if (res.status === 200) {
      const url = res.data.url;
      const parseUrl = queryString.parse(url);
      localStorage.setItem("TwitterLoginStateCode", parseUrl?.state as string);
      window.location.href = url;
    } else {
      if (typeof res.error === "string") {
        showModal(res.error, "Error");
      } else {
        showModal(res.error, "Error");
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("background--login--left")}>
          <div className={cx("from--login")}>
            <div className={cx("img--title")}>
              <img src="assets/svg/LogoLogintitle.svg" alt="" />
              <h4>Bwallet Sign-in</h4>
            </div>
            <div className={cx("row d-flex align-items-center")}>
              <div
                className={cx(
                  "col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12",
                  "line--right--login"
                )}
              >
                <div className={cx("title--login")}>
                  Enter your email to{" "}
                  <a
                    href="https://testworld.babbu.io/register"
                    target={"_blank"}
                  >
                    register
                  </a>{" "}
                  and sign in!
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className={cx("input--email--login")}>
                    <input
                      className={cx("w-100")}
                      type="text"
                      placeholder="your@example.com"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                    />
                    <img src="assets/svg/sms-tracking.svg" alt="" />
                  </div>
                  {errors.email?.type === "required" && (
                    <span className={cx("error--text")}>Email is required</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className={cx("error--text")}>Email is invalid</span>
                  )}
                  {ran && (
                    <>
                      <div className={cx("input--email--login")}>
                        <input
                          type="text"
                          placeholder="Email Verification Code"
                          min={5}
                          max={5}
                          {...register("code", {
                            required: true,
                            minLength: 5,
                            maxLength: 5,
                          })}
                          onChange={(e) => setCode(e.target.value)}
                          className={cx("w-100")}
                        />
                        <span className={cx("get--code")}>
                          <button className={cx("bg--time")} disabled={true}>
                            {timeLeft.seconds || 0}s
                          </button>
                        </span>
                      </div>
                      {errors.code?.type === "required" && (
                        <span className={cx("error--text")}>
                          Code is required
                        </span>
                      )}
                      {errors.code?.type === "maxLength" && (
                        <span className={cx("error--text")}>
                          Code is invalid
                        </span>
                      )}
                      {timeLeft.seconds === undefined && ran && (
                        <span className={cx("error--text")}>
                          Code is expired
                        </span>
                      )}
                    </>
                  )}
                  {ran && newUser && (
                    <>
                      <div className={cx("input--email--login")}>
                        <input
                          type="text"
                          placeholder="Referral Code"
                          {...register("referralCode")}
                          className={cx("w-100")}
                        />
                      </div>
                    </>
                  )}
                  <div className={cx("Policy--text")}>
                    By clicking "Start", you agree to our{" "}
                    <strong>Privacy Policy</strong> Terms of Babbu Lab Service.
                  </div>
                  <div>
                    {code.length < 5 ? (
                      <button
                        className={cx("btn--Confirm")}
                        type={"button"}
                        onClick={async () => {
                          const values = getValues();
                          await handleGetCode(values.email);
                        }}
                      >
                        START GET OTP
                      </button>
                    ) : (
                      <button className={cx("btn--Confirm")} type={"submit"}>
                        LOGIN
                      </button>
                    )}
                  </div>
                  <div className={cx("connect--wallet--login")}>
                    <ButtonReuse
                      big
                      border={"2px solid #000000"}
                      iconRight={"assets/svg/TWBLUE.svg"}
                      onClick={loginWithTwitter}
                    >
                      Connect with Twitter/X
                    </ButtonReuse>
                    <ButtonReuse
                      big
                      border={"2px solid #000000"}
                      iconRight={"assets/svg/RainBow.svg"}
                      onClick={loginWithWeb3}
                    >
                      Connect with Rainbow
                    </ButtonReuse>
                  </div>
                  <div className={cx("line--wallet--option")}>
                    <div className={cx("line--elm")}>
                      <span>or more options</span>
                    </div>
                  </div>
                  <div className={cx("list--icon--social")}>
                    {/* <img src="assets/svg/ios.svg" alt="" /> */}
                    <img
                      className={cx("hover-effect")}
                      src="assets/svg/GOOGLE.svg"
                      alt=""
                    />
                    <img
                      className={cx("hover-effect")}
                      src="assets/svg/TWBLUE.svg"
                      alt=""
                    />
                    <img
                      className={cx("hover-effect")}
                      src="assets/svg/TELEGRAM.svg"
                      alt=""
                    />
                  </div>
                </form>
              </div>
              <div
                className={cx("col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12")}
              >
                <div className={cx("login-right", "text-center")}>
                  <h5 className={cx("mt-5")}>LOG IN WITH OR CODE!</h5>
                  <div className={cx("content--title")}>
                    Scan this code with <strong>Buwallet</strong> mobile app to
                    login instantly.
                  </div>
                  <img src="assets/svg/SvgQrLogin.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
