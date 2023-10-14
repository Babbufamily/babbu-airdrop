import ButtonReuse from "./Button";
import classNames from "classnames/bind";
import styles from "../page/Profile/Overview/Overview.module.scss";
import PropTypes, { InferProps } from "prop-types";

const cx = classNames.bind(styles);

export default function BoxGreen({
  title,
  content,
}: InferProps<typeof BoxGreen.propTypes>) {
  return (
    <div className={cx("col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 mt-4")}>
      <ButtonReuse BtnOverview>
        <h6 style={{ margin: "0px" }}>{title}</h6>
        <h3 style={{ margin: "0px" }}>{content}</h3>
      </ButtonReuse>
    </div>
  );
}
BoxGreen.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
};
