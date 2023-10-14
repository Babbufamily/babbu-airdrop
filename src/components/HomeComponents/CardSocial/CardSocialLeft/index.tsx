import classNames from "classnames/bind";
import styles from "./CardSocialLeft.module.scss";
import ButtonReuse from "../../../Button";

// import { useState } from "react";
const cx = classNames.bind(styles);
function CardSocialLeft() {
  // const [textVisible, setTextVisible] = useState("");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("position-relative")}>
          <div className={cx("title--social")}>
            The Power of <br /> Social Interaction
          </div>
          <div
            style={{ marginTop: "22px" }}
            className={cx("d-flex", "flex-wrap", "mb-5")}
          >
            <ButtonReuse hashtag background={"#CAFF04"}>
              #BuTip
            </ButtonReuse>
            <ButtonReuse hashtag background={"#CAFF04"}>
              #BuGift
            </ButtonReuse>
            <ButtonReuse hashtag background={"#FFF500"}>
              #SocialFi
            </ButtonReuse>
          </div>
          <h2 className={cx("MORE---FIREND")}>MORE FRIEND </h2>
          <p className={cx("text")}>
            Affiliate Marketing platform that connects businesses that need to
            promote products & services.
          </p>
          <ButtonReuse
            background={"#000000"}
            padding={"17px 32px"}
            color={"#FFD527"}
            borderRadius={"12px"}
            fontSize={"24px"}
            fontWeight={"500"}
            margin={" 40px 0px"}
          >
            Earn $BuTip
          </ButtonReuse>
          <div className={cx("Download---btn")}>
            <span className={cx("d-flex", "align-items-center")}>
              <img
                className={cx("me-2")}
                src="assets/svg/Telephone.svg"
                alt=""
              />
              Download BabbuCity App:
            </span>
          </div>
          <div className={cx("Download---btn")}>
            <a
              href="https://play.google.com/store/apps/details?id=com.airdropapp"
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "me-4 d-flex align-items-center",
                "text-decoration"
              )}
            >
              <img className={cx("me-2")} src="assets/svg/Androi.svg" alt="" />
              Android
            </a>
            <a
              href="https://testflight.apple.com/join/Q7owh4aC"
              target="_blank"
              rel="noopener noreferrer"
              className={cx("d-flex align-items-center", "text-decoration")}
            >
              <img className={cx("me-2")} src="assets/svg/Ios.svg" alt="" />
              Ios(TestFlight)
            </a>
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginTop: "40px",
              marginBottom: "30px",
            }}
          >
            <p>Trusted by millions and growing...</p>
            <div className={cx("d-flex", "align-items-center")}>
              <p className={cx("m-0", "pe-4")}>Audited by: </p>
              <img src="assets/svg/Certik.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardSocialLeft;
