import classNames from "classnames/bind";
import styles from "./BabbuCommunity.module.scss";

const cx = classNames.bind(styles);
function BabbuCommunity() {
  const listImgCommunity = [
    {
      imgCommunity: "assets/svg/Galxe.svg",
      link: "https://galxe.com/babbucity",
    },
    {
      imgCommunity: "assets/svg/magicSquare.svg",
      link: "https://magic.store/app/babbu-city",
    },
    {
      imgCommunity: "assets/svg/GiveAway.svg",
      link: "https://giveaway.com/en/profile/qABJTpC6dT3SMdlD",
    },
    {
      imgCommunity: "assets/svg/Quest.svg",
      link: "https://questn.com/",
    },
    {
      imgCommunity: "assets/svg/Drapdata.svg",
      link: "https://dappradar.com/dapp/babbu-city",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("BabbuCommunity")}>
            <h2>Babbu Community</h2>
            <div className={cx("size")}>
              <div className={cx("row", "justify-content-center")}>
                {listImgCommunity.map((items, index) => (
                  <div
                    key={index}
                    className={cx(
                      "col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12",

                      "text-center"
                    )}
                  >
                    <a href={items.link} target={"_blank"}>
                      <img src={items.imgCommunity} alt="" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BabbuCommunity;
