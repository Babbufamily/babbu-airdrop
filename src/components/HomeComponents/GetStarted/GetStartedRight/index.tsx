import classNames from "classnames/bind";
import styles from "./GetStartedRight.module.scss";
import Card from "../../../Card";
const cx = classNames.bind(styles);
function GetStartedRight() {
  const ListEasyToEarn = [
    {
      img: "assets/svg/1.svg",
      title: "Connect Account",
      content: "Link your twitter to create your Babbu City account",
    },
    {
      img: "assets/svg/2.svg",
      title: "Activate",
      content: "Share & Retweets check status",
    },
    {
      img: "assets/svg/3.svg",
      title: "Start earning $Butip",
      content: "Keep tweeting everyday to generate points",
    },
    {
      img: "assets/svg/4.svg",
      title: "Claim Reward",
      content: "Claim your $Butip for $Bucoin tokens in the next time.",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Card
          elm
          padding={"24px 32px"}
          borderRadius={"16px"}
          border={"2px solid #000000"}
          boxShadow={"0px 4px 0px 0px #0000001A"}
          minHeight={"397px"}
        >
          <h5 className={cx("text-start")}>Easy to Earn:</h5>
          <h6>
            Butips earned during the Presale can be exchanged for $BuCoin tokens
            in the future.
          </h6>
          <div>
            {ListEasyToEarn.map((items, index) => (
              <div key={index} className={cx("d-flex align-items-center mt-4")}>
                <div>
                  <img src={items.img} alt="" />
                </div>
                <div className={cx("ms-4")}>
                  <h6 className={cx("m-0")}>{items.title}</h6>
                  <p className={cx("p-0")}>{items.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
export default GetStartedRight;
