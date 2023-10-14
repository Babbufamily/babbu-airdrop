import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { InferProps } from "prop-types";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function Card({
  children,
  half,
  border,
  display,
  alignItems,
  justifyContent,
  elm,
  borderRadius,
  padding,
  background,
  boxShadow,
  minHeight,
  maxHeight,
  outLine,
}: InferProps<typeof Card.prototype>) {
  const classes = cx("wrapper", {
    half,
    elm,
    outLine,
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div
          style={{
            border,
            display,
            alignItems,
            justifyContent,
            borderRadius,
            padding,
            background,
            boxShadow,
            minHeight,
            maxHeight,
          }}
          className={classes}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;

Card.prototype = {
  children: PropTypes.string,
  half: PropTypes.string,
  border: PropTypes.string,
  display: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  elm: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string,
  boxShadow: PropTypes.string,
  outLine: PropTypes.string,
  maxHeight: PropTypes.string,
};
