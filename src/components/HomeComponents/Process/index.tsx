import classNames from "classnames/bind";
import styles from "./Process.module.scss";
import Card from "../../Card";
const cx = classNames.bind(styles);
function Process() {
  const ListProcessing = [
    {
      imgTitle: "assets/svg/1.svg",
      title: "Create BuTip",
      imgContent: "assets/svg/CreateButip2.svg",
      describe:
        "Earn points by referring your friends and seize the opportunity to win $BuTip, $BuCoin.",
    },
    {
      imgTitle: "assets/svg/2.svg",
      title: "Point Calculations",
      imgContent: "assets/svg/Caltulato.svg",
      describe:
        "The calculation of points will occur automatically through the tool as long as you continue referring.",
    },
    {
      imgTitle: "assets/svg/3.svg",
      title: "Claim Butip",
      imgContent: "assets/svg/TokenClaim.svg",
      describe:
        "After the program's competition ends, we will quickly transfer tokens to users' wallets",
    },
    {
      imgTitle: "assets/svg/4.svg",
      title: "Cashout $Bucoin",
      imgContent: "assets/svg/EarnButip.svg",
      describe:
        "Claim your percentage of the previous epoch tokens from the dashboard in the next State.",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("processing")}>
            <h2 className={cx("mb-0")}>How to $Butip Process</h2>
            <div className={cx("row")}>
              {ListProcessing.map((items, index) => (
                <div
                  key={index}
                  className={cx(
                    "col-xl-3 col-lg-6 col-md-12 col-sm-12 col-12 mt-3"
                  )}
                >
                  <Card half process>
                    <div className={cx("header--processing")}>
                      <img src={items.imgTitle} alt="" />
                      <h5>{items.title}</h5>
                    </div>
                    <div className={cx("text-center", "img--processing")}>
                      <img
                        style={{ width: "190px", height: "190px" }}
                        className={cx("img--process--")}
                        src={items.imgContent}
                        alt=""
                      />
                    </div>
                    <h6>{items.describe}</h6>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Process;
