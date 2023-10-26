import classNames from "classnames/bind";
import styles from "./Tokenomic.module.scss";

const cx = classNames.bind(styles);
const listBoxTokenomic = [
  {
    img: "assets/svg/BabbuTipTokenomic.svg",
    href: "https://docs.babbu.io/#coin-overview",
  },
  {
    img: "assets/svg/BabbuIconTokenomic.svg",
    href: "https://docs.babbu.io/babbu-network/tokenomic",
  },
];
function Tokenomic() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h2>Babbu Tokenomic</h2>
        <div className={cx("row")}>
          <div
            className={cx("col-12 text-center")}
            style={{ marginTop: "24px" }}
          >
            <a rel="noopener noreferrer">
              <img className={cx('img--tokenomic')} src="assets/svg/TokenomicPic1.svg" alt="" />
            </a>
          </div>
          {listBoxTokenomic.map((items, index) => (
            <div
              className={cx(
                "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center"
              )}
              key={index}
            >
              <a href={items.href} target="_blank" rel="noopener noreferrer">
                <img
                  className={cx("w-100")}
                  style={{
                    marginTop: "24px",
                  }}
                  src={items.img}
                  alt=""
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tokenomic;
