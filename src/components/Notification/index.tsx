import classNames from "classnames/bind";
import styles from "./Notification.module.scss";
import { InferProps } from "prop-types";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function Notification({
  success,
  warning,
  error,
  active,
  title,
  iconLeft,
  iconRight,
}: InferProps<typeof Notification.PropTypes>) {
  const classes = cx("wrapper", {
    success,
    warning,
    error,
    active,
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div style={{ background: "#000000" }} className={classes}>
          {iconLeft && (
            <span className={cx("iconLeft")}>
              {<img src={iconLeft} alt="" />}
            </span>
          )}
          {title}
          {iconRight && (
            <span className={cx("iconRight")}>
              {<img src={iconRight} alt="" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;

Notification.PropTypes = {
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  active: PropTypes.bool,
  title: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
};
