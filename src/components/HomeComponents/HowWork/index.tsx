import classNames from "classnames/bind";
import styles from "./HowWork.module.scss";
import ButtonReuse from "../../Button";
import Card from "../../Card";
import Accodition from "../../Accodition";
import ButipWorkCpn from "../../Accodition/Components/ButipWork";

const cx = classNames.bind(styles);
function HowWork() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("How-Work")}>
            <div className={cx("d-flex justify-content-center")}>
              <ButtonReuse
                background={"#CDF202"}
                borderRadius={"12px"}
                padding={"8px 16px"}
                fontSize={"24px"}
                fontWeight={"600"}
                display={"flex"}
                alignItems={"center"}
              >
                <img src="/assets/svg/LogoIconMainNew.svg" alt="" />
                <span className={cx("ms-2 me-3 text-dark")}>Bucoin</span>
                <ButtonReuse
                  background={"#fff"}
                  padding={"4px 10px"}
                  borderRadius={"12px"}
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"17px"}
                  color={"#000000"}
                >
                  = 1,000 <strong className={cx("ms-2 me-3")}>Butip</strong>
                  <img src="assets/svg/ButipWord.svg" alt="" />
                </ButtonReuse>
              </ButtonReuse>
            </div>
            <h2>How $Butip Work?</h2>
            <p>
              Earning $BuTip is simple - just use Twitter or Facebook to join
              Airdrop!{" "}
            </p>
            <div className={cx("row")}>
              <div
                className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5")}
              >
                <Card half>
                  <div className={cx("title--card")}>
                    <img src="assets/svg/Twitter.svg" alt="" />
                    <h4>Just me use Twitter!</h4>
                  </div>
                  <div className={cx("content--card--word")}>
                    <nav>
                      <ul>
                        <li>
                          Reply, quote, or tweet out mentioningor
                          <span className={cx("mentioningor")}>
                            $Bucoin
                          </span> or{" "}
                          <span className={cx("mentioningor")}>$Bucoin</span> or
                          <span className={cx("mentioningor")}>$BabbuCity</span>
                          and you will automatically be awarded points!
                        </li>
                        <li>
                          Depending on the type of tip, your multiplier will
                          change as follows:
                        </li>
                      </ul>
                    </nav>
                    <div className={cx("row align-items-center", "dropMenu")}>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4"
                        )}
                      >
                        <Accodition content={<ButipWorkCpn />} />
                      </div>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4"
                        )}
                      >
                        <div className={cx("d-flex align-items-center")}>
                          <div className={cx("me-3")}>
                            <img src="assets/svg/Reply.svg" alt="" />
                          </div>
                          <div>
                            <div className={cx("reply")}>Reply</div>
                            <div className={cx("quantity")}>
                              = 0.2
                              <img src="assets/svg/ButipWord.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4"
                        )}
                      >
                        <div className={cx("d-flex align-items-center")}>
                          <div className={cx("me-3")}>
                            <img src="assets/svg/Retweets.svg" alt="" />
                          </div>
                          <div>
                            <div className={cx("reply")}>Retweets</div>
                            <div className={cx("quantity")}>
                              = 20
                              <img src="assets/svg/ButipWord.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4"
                        )}
                      >
                        <div className={cx("d-flex align-items-center")}>
                          <div className={cx("me-3")}>
                            <img src="assets/svg/Favorite.svg" alt="" />
                          </div>
                          <div>
                            <div className={cx("reply")}>Like</div>
                            <div className={cx("quantity")}>
                              = 0.02
                              <img src="assets/svg/ButipWord.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4"
                        )}
                      >
                        <div className={cx("d-flex align-items-center")}>
                          <div className={cx("me-3")}>
                            <img src="assets/svg/Quotes.svg" alt="" />
                          </div>
                          <div>
                            <div className={cx("reply")}>Quotes</div>
                            <div className={cx("quantity")}>
                              = 2
                              <img src="assets/svg/ButipWord.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={cx(
                          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-4"
                        )}
                      >
                        <div className={cx("d-flex align-items-center")}>
                          <div className={cx("me-3")}>
                            <img src="assets/svg/View.svg" alt="" />
                          </div>
                          <div>
                            <div className={cx("reply")}>View</div>
                            <div className={cx("quantity")}>
                              = 0.002
                              <img src="assets/svg/ButipWord.svg" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWork;
