import classNames from "classnames/bind";
import styles from "./ButipWork.module.scss";

const cx = classNames.bind(styles);
function ButipWorkCpn() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <nav>
          <ul>
            <li className={cx("d-flex align-items-center")}>
              <div>
                <img src="assets/svg/Quotes.svg" alt="" />
              </div>
              <div>
                <h6>Quote</h6>
                <div>100x $BuTip multiplier</div>
              </div>
            </li>
            <li className={cx("d-flex align-items-center")}>
              <div>
                <img src="assets/svg/ReplyAccodition.svg" alt="" />
              </div>
              <div>
                <h6>Reply</h6>
                <div>10x $BuTip multiplier</div>
              </div>
            </li>
            <li className={cx("d-flex align-items-center")}>
              <div>
                <img src="assets/svg/RepliedKickbacks.svg" alt="" />
              </div>
              <div>
                <h6>Replied kickbacks</h6>
                <div>5x $BuTip multiplier</div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ButipWorkCpn;
