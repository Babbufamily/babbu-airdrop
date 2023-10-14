import classNames from "classnames/bind";
import styles from "./BabbuCommunity.module.scss";

const cx = classNames.bind(styles);
function BabbuCommunity() {
  const listImgCommunity = [
    {
      imgCommunity: "assets/svg/Galxe.svg",
    },
    {
      imgCommunity: "assets/svg/magicSquare.svg",
    },
    {
      imgCommunity: "assets/svg/GiveAway.svg",
    },
    {
      imgCommunity: "assets/svg/Quest.svg",
    },
    {
      imgCommunity: "assets/svg/Drapdata.svg",
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
                    <img src={items.imgCommunity} alt="" />
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
