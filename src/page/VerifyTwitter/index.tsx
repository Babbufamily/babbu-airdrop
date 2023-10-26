import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import ButtonReuse from "../../components/Button";
import { useEffect, useState } from "react";
import queryString from "query-string";
import {
  getToastConfig, textQuoteTwitter,
  textShareTwitter,
  urlShareTwitter,
} from "../../assets/Constant.tsx";
import AirDropApi from "../../axios/AirDropApi.tsx";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastOptions } from "react-toastify";
import { useConnection } from "../../redux/connection";
import { useQuery } from "react-query";

const cx = classNames.bind(styles);
function VerifyTwitter() {
  const { onSetHomeTabActive } = useConnection();
  const [paramShareTwitter, setParamShareTwitter] = useState<string>("");
  const [paramQuoteTwitter, setParamQuoteTwitter] = useState<string>("");
  const navigate = useNavigate();

  const { data: statusActiveTask } = useQuery(
    ["airDropApi.checkKycTwitter"],
    () => AirDropApi.checkKycTwitter()
  );

  useEffect(() => {
    const value = queryString.stringify({
      text: textShareTwitter,
    });
    const valueQuote = queryString.stringify({
      text: textQuoteTwitter,
      url: urlShareTwitter,
    });
    setParamQuoteTwitter(valueQuote)
    setParamShareTwitter(value);
  }, []);

  const showModal = (title: string, status: string) => {
    const config = getToastConfig(status);
    toast(title, config as ToastOptions);
  };

  const handleValidateKyc = async () => {
    const result = await AirDropApi.checkKycTwitter();
    if (result.status === 200) {
      if (result.data.isActive) {
        navigate("/overview");
        onSetHomeTabActive(2);
        showModal('Active account success', 'Success')
      }
      if (!result.data.isRetweet) {
        showModal('Please retweet to active account', 'Error')
      }

      if (!result.data.isShare) {
        showModal('Please share to active account', 'Error')
      }
    } else {
      if (typeof result.error === "string") {
        showModal(result.error, "Error");
      } else {
        showModal(result.error[0], "Error");
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("login--twitter")}>
          <div className={cx("form--login--tw")}>
            <div
              className={cx(
                "d-flex align-items-center justify-content-between",
                "header--from--login--tw"
              )}
            >
              <Link to={"/profile"}>
                <img src="assets/svg/CloseButton.svg" alt="" />
              </Link>
              <img src="assets/svg/BabbuLogoBlackHeader.svg" alt="" />
            </div>
            <div className={cx("content--from--tw")}>
              <h5>Active Account:</h5>
              <p>
                To activate your account, please send an activation tweet and
                share your post for our confirmation using the buttons below.
              </p>
              <p>
                If you've already sent it out, you can enable retesting below.
                We only check your most recent activity.
              </p>
            </div>
            <div className={cx("footer--from--login")}>
              <a
                className="twitter-share-button"
                href={
                  statusActiveTask?.data?.isShare === false
                    ? `https://twitter.com/intent/tweet?${paramShareTwitter}`
                    : "#"
                }
                target={statusActiveTask?.data?.isShare === false ? "_blank" : ""}
              >
                <ButtonReuse
                  big
                  border={"2px solid #000000"}
                  background={"#FFFFFF"}
                  padding={"17px 0px"}
                  disableClass={statusActiveTask?.data?.isShare}
                >
                  <div className={cx("content--box")}>
                    <h6>Share</h6>
                    <img src="assets/svg/Share.svg" alt="" />
                  </div>
                </ButtonReuse>
              </a>
              <a
                href={
                  statusActiveTask?.data?.isRetweet === false ?
                    `https://twitter.com/intent/tweet?${paramQuoteTwitter}` : "#"
                }
                target={statusActiveTask?.data?.isRetweet === false ? "_blank" : ""}
              >
                <ButtonReuse
                  big
                  border={"2px solid #000000"}
                  background={"#FFFFFF"}
                  padding={"17px 0px"}
                  disableClass={statusActiveTask?.data?.isRetweet}
                >
                  <div className={cx("content--box")}>
                    <h6>Retweets</h6>
                    <img src="assets/svg/Retweets2.svg" alt="" />
                  </div>
                </ButtonReuse>
              </a>
              <ButtonReuse
                big
                background={"#000000"}
                color={"#fff"}
                padding={"17px 0px"}
                onClick={handleValidateKyc}
              >
                <div className={cx("content--box")}>
                  <h6>CHECK STATUS</h6>
                  <img src="../../.assets/svg/TWWHITE.svg" alt="" />
                </div>
              </ButtonReuse>
            </div>
            <p className={cx("Notification")}>
              Cannot claim tokens until you have activated your account!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyTwitter;
