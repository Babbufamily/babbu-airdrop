import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { InferProps } from "prop-types";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function ButtonReuse({
  children,
  border,
  borderRadius,
  mini,
  small,
  medium,
  big,
  BtnIconRight,
  padding,
  margin,
  background,
  color,
  fontSize,
  fontWeight,
  onClick,
  hashtag,
  boxShadow,
  outLine,
  width,
  display,
  alignItems,
  justifyContent,
  iconLeft,
  iconRight,
  btnProfile,
  btnVerify,
  connect,
  BtnOverview,
  disableClass,
}: InferProps<typeof ButtonReuse.propTypes>) {
  const classes = cx("wrapper", {
    mini,
    small,
    medium,
    BtnIconRight,
    big,
    hashtag,
    outLine,
    display,
    alignItems,
    justifyContent,
    btnProfile,
    btnVerify,
    connect,
    BtnOverview,
    disableClass,
  });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <button
          style={{
            border: border as string,
            borderRadius: borderRadius as string,
            padding: padding as string,
            margin: margin as string,
            background: background as string,
            color: color as string,
            fontSize: fontSize as string,
            fontWeight: fontWeight as string,
            width: width as string,
            boxShadow: boxShadow as string,
            display: display as string,
            alignItems: alignItems as string,
            justifyContent: justifyContent as string,
          }}
          className={classes}
          onClick={onClick}
          type={"button"}
        >
          {iconLeft && (
            <span className={cx("iconLeft")}>
              {<img src={iconLeft} alt="" />}
            </span>
          )}
          {children}
          {iconRight && (
            <span className={cx("iconRight")}>
              {<img src={iconRight} alt="" />}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default ButtonReuse;

ButtonReuse.propTypes = {
  children: PropTypes.any,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  mini: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  BtnIconRight: PropTypes.bool,
  big: PropTypes.bool,
  hashtag: PropTypes.bool,
  boxShadow: PropTypes.string,
  outLine: PropTypes.bool,
  width: PropTypes.string,
  onClick: PropTypes.any,
  display: PropTypes.string,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  btnProfile: PropTypes.string,
  btnVerify: PropTypes.bool,
  connect: PropTypes.bool,
  BtnOverview: PropTypes.bool,
  disableClass: PropTypes.bool,
};
