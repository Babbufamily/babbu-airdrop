import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import AffiliateMarketing from "../../components/HomeComponents/AffiliateMarketing";
import HowWork from "../../components/HomeComponents/HowWork";
import Process from "../../components/HomeComponents/Process";
import BabbuNetwork from "../../components/HomeComponents/BabbuNetwork";
import NEWSROOM from "../../components/HomeComponents/NEWSROOM";
import CardSocialLeft from "../../components/HomeComponents/CardSocial/CardSocialLeft";
import CardSocialRight from "../../components/HomeComponents/CardSocial/CardSocialRight";
import GetStartedLeft from "../../components/HomeComponents/GetStarted/GetStartedLeft";
import GetStartedRight from "../../components/HomeComponents/GetStarted/GetStartedRight";
import BabbuCommunity from "../../components/HomeComponents/BabbuCommunity";
import Tokenomic from "../../components/HomeComponents/Tokenomic";
import UserParameters from "../../components/HomeComponents/UserParameters";
// import UserParameters from "../../components/HomeComponents/UserParameters";

const cx = classNames.bind(styles);
function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <section className={cx("social")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div
                className={cx(
                  "col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12",
                  "order--1"
                )}
              >
                <CardSocialLeft />
              </div>
              <div
                className={cx(
                  "col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 order--2"
                )}
              >
                <CardSocialRight />
              </div>
            </div>
          </div>
        </section>
         <section>
          <div className={cx("container")}>
            <UserParameters />
          </div>
        </section>
        <section>
          <AffiliateMarketing />
        </section>
        <section>
          <HowWork />
        </section>
        <section className={cx("GetStarted")}>
          <div className={cx("container")}>
            <h2>Get Started</h2>
            <div className={cx("row")}>
              <div
                className={cx(
                  "col-xl-5 col-lg-12 col-md-12  col-sm-12 col-12 mt-5"
                )}
              >
                <GetStartedLeft />
              </div>
              <div
                className={cx(
                  "col-xl-7 col-lg-12 col-md-12  col-sm-12 col-12 mt-5"
                )}
              >
                <GetStartedRight />
              </div>
            </div>
          </div>
        </section>
        <section>
          <Process />
        </section>
        <section>
          <div className={cx("container")}>
            <Tokenomic />
          </div>
        </section>
        <section>
          <BabbuNetwork />
        </section>
        <section>
          <NEWSROOM />
        </section>
        <section>
          <BabbuCommunity />
        </section>
      </div>
    </div>
  );
}

export default HomePage;
