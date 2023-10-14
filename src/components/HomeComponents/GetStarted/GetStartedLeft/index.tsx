import classNames from "classnames/bind";
import styles from "./GetStartedLeft.module.scss";
import Card from "../../../Card";
import { useEffect, useState } from "react";
import { ITimeLeft } from "../../../../assets/Interface.ts";
import {
  calculateTimeLeft,
  defaultDataTimeLeft,
} from "../../../../assets/Constant.tsx";
import { useConnection } from "../../../../redux/connection";
import { formatUnits } from "viem";
import ButtonReuse from "../../../Button/index.tsx";
const cx = classNames.bind(styles);
function GetStartedLeft() {
  const { connection } = useConnection();
  const { currentState, currentStateInfo } = connection;
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(defaultDataTimeLeft);
  const [text, setText] = useState<string>("IN");
  const [countDownTime, setCountDownTime] = useState<number>(
    new Date().getTime()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countDownTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!currentStateInfo) return setCountDownTime(new Date().getTime());
    const currentTime = new Date().getTime();
    const startTime =
      Number(formatUnits(currentStateInfo?.startRoundTime, 0)) * 1000;
    const endTime =
      Number(formatUnits(currentStateInfo?.endRoundTime, 0)) * 1000;
    if (startTime > currentTime) {
      setCountDownTime(startTime);
      setText("IN");
    }
    if (startTime < currentTime && currentTime < endTime) {
      setCountDownTime(endTime);
      setText("NOW");
    }
  }, [currentStateInfo]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Card
          border={"5px solid rgba(205, 242, 2, 1)"}
          background={"rgba(247, 255, 210, 1)"}
          padding={"24px 32px"}
          borderRadius={"12px"}
          boxShadow={"0px 4px 0px 0px rgba(0, 0, 0, 0.1)"}
          minHeight={"397px"}
        >
          <h5>STAGE {currentState}</h5>
          <nav>
            <ul className={cx("mt-5")}>
              <li>
                <div className={cx("number")}>{timeLeft.days || 0}</div>
                <div className={cx("text")}>Days</div>
              </li>
              <li>
                <div className={cx("number")}>{timeLeft.hours || 0}</div>
                <div className={cx("text")}>Hours</div>
              </li>
              <li>
                <div className={cx("number")}>{timeLeft.minutes || 0}</div>
                <div className={cx("text")}>Minutes</div>
              </li>
              <li>
                <div className={cx("number")}>{timeLeft.seconds || 0}</div>
                <div className={cx("text")}>Seconds</div>
              </li>
            </ul>
          </nav>
          <ButtonReuse
            big
            background={"#000000"}
            color={"#fff"}
            fontSize={"18px"}
            fontWeight={"600"}
            margin={"24px 0px 0px 0px"}
          >
            START {text}
          </ButtonReuse>
          <div className={cx("download--app")}>
            <div
              className={cx("download--app--content")}
              style={{ fontSize: "20px", fontWeight: "600" }}
            >
              <span
                className={cx(
                  "d-flex",
                  "align-items-center",
                  "justify-content-center"
                )}
              >
                <img
                  className={cx("me-3")}
                  src="assets/svg/Telephone.svg"
                  alt=""
                />
                Download BabbuCity App:
              </span>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "600",
                textAlign: "center",
                marginTop: "10px",
              }}
              className={cx(
                "d-flex",
                "align-items-center",
                "justify-content-center"
              )}
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.airdropapp"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("me-5", "d-flex", "align-items-center")}
              >
                {" "}
                <img
                  className={cx("me-3")}
                  src="assets/svg/Androi.svg"
                  alt=""
                />
                Android
              </a>
              <a
                href="https://testflight.apple.com/join/Q7owh4aC"
                target="_blank"
                rel="noopener noreferrer"
                className={cx("d-flex", "align-items-center")}
              >
                {" "}
                <img className={cx("me-3")} src="assets/svg/Ios.svg" alt="" />
                Ios(TestFlight)
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default GetStartedLeft;
