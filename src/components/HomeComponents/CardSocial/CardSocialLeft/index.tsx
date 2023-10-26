import classNames from "classnames/bind";
import styles from "./CardSocialLeft.module.scss";
import ButtonReuse from "../../../Button";
// import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function CardSocialLeft() {
  // const navigate = useNavigate();
  // const handleChangeHref = () => {
  //   navigate("https://docs.babbu.io/");
  //   console.log(handleChangeHref, "abc");
  // };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("position-relative")}>
          <div className={cx("title--social")}>
            The Power of <br /> Social Interaction
          </div>
          <div
            style={{ marginTop: "30px" }}
            className={cx("d-flex", "flex-wrap", "mb-5")}
          >
            <ButtonReuse hashtag background={"#CAFF04"} color={"#000"}>
              #BuTip
            </ButtonReuse>
            <ButtonReuse hashtag background={"#CAFF04"} color={"#000"}>
              #BuGift
            </ButtonReuse>
            <ButtonReuse hashtag background={"#FFF500"} color={"#000"}>
              #SocialFi
            </ButtonReuse>
          </div>
          <h2 className={cx("MORE---FIREND")}>MORE FRIEND </h2>
          <p className={cx("text", "mt-4")}>
            Affiliate Marketing platform that connects businesses that need to
            promote products & services.
          </p>
          <div className={cx("list--btn")}>
            <ButtonReuse
              background={"#000000"}
              padding={"15px 32px"}
              color={"#FFD527"}
              borderRadius={"12px"}
              border={"2px solid #000000"}
              fontSize={"24px"}
              fontWeight={"500"}
              margin={" 45px 16px 40px 0px"}
            >
              Earn $BuTip
            </ButtonReuse>
            <ButtonReuse
              background={"none"}
              padding={"15px 32px"}
              color={"#000000"}
              borderRadius={"12px"}
              border={"2px solid #000000"}
              fontSize={"24px"}
              fontWeight={"500"}
              margin={" 45px 0px 40px 0px"}
              boxShadow={"0px 4px 0px 0px #0000001A"}
            >
              <a
                href="https://docs.babbu.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dreampaper
              </a>
            </ButtonReuse>
          </div>
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
              marginTop: "50px",
            }}
          >
            <p>Trusted by millions and growing...</p>
            <div className={cx("d-flex", "align-items-center")}>
              <p className={cx("m-0", "pe-4")}>Audited by: </p>
              <a
                href="https://skynet.certik.com/projects/babbu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="assets/svg/Certik.svg" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardSocialLeft;
