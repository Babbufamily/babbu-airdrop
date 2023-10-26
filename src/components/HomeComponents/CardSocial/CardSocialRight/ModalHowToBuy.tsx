import Modal from "react-bootstrap/Modal";
import classNames from "classnames/bind";
import styles from "./CardSocialRight.module.scss";
import PropTypes, { InferProps } from "prop-types";
import {BUCOIN_CONTRACT_ADDRESS_BSC, USDT_DECIMAL_BSC} from "../../../../assets/Constant.tsx";
import {formatUnits} from "viem";

const cx = classNames.bind(styles);
export default function ModalHowToBuy({
  show,
  handleChange,
  maxPurchaseAmount,
  minPurchaseAmount,
}: InferProps<typeof ModalHowToBuy.propTypes>) {
  return (
    <Modal show={show} onHide={handleChange}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div
            className={cx("d-flex align-items-center justify-content-between")}
          >
            <img
              src="assets/svg/CloseButton.svg"
              alt=""
              onClick={handleChange}
            />
            <img src="assets/svg/BabbuLogoBlackHeader.svg" alt="" />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#101010",
          }}
        >
          HOW TO BUY?
        </h5>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "400",
            marginBottom: "24px",
          }}
        >
          Take charge and buy $BUCOIN in presale using ETH, BNB, USDT, or bank
          card before it lists on DEX.
        </p>
        <nav>
          <ol style={{ fontSize: "16px", fontWeight: "400" }}>
            <li>Sign-up an account at babbu.io.</li>
            <li>Verify account with Twitter/X and Blcockchain Wallet.</li>
            <li>Buy $Bucoin tokens now!</li>
            <li>
              Bucoin BNBChain Smartcontract:{" "}
              <a
                href={`https://bscscan.com/address/${BUCOIN_CONTRACT_ADDRESS_BSC}`}
                target={"_blank"}
              >
                {BUCOIN_CONTRACT_ADDRESS_BSC}
              </a>
            </li>
            <li>Min: {formatUnits(minPurchaseAmount || 0, USDT_DECIMAL_BSC)}$ - max: {formatUnits(maxPurchaseAmount || 0, USDT_DECIMAL_BSC)} </li>
            <li>Each account can buy once/Stage. </li>
          </ol>
        </nav>
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{
            width: "100%",
            padding: "16px 0px",
            borderRadius: "12px",
            background: "#000",
            color: "#fff",
          }}
          onClick={handleChange}
        >
          OK
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ModalHowToBuy.propTypes = {
  show: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  maxPurchaseAmount: PropTypes.any.isRequired,
  minPurchaseAmount: PropTypes.any.isRequired
};
