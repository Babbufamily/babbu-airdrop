import classNames from "classnames/bind";
import styles from "./Accodition.module.scss";
import { InferProps } from "prop-types";
import { useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const cx = classNames.bind(styles);
function Accodition({ content }: InferProps<typeof Accodition.propTypes>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("accordion")}>
          <div className={cx("accordion-header")} onClick={toggleAccordion}>
            <div
              className={cx(
                "d-flex align-items-center justify-content-between"
              )}
            >
              <div className={cx("d-flex align-items-center")}>
                <img src="assets/svg/Twitter.svg" alt="" />
                <div>
                  <h6>Original Tweet</h6>
                  <div>200x $BuTip multiplier</div>
                </div>
              </div>
              <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>
            {isOpen && <div className={cx("accordion-content")}>{content}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accodition;
Accodition.propTypes = {
  content: PropTypes.any,
};
