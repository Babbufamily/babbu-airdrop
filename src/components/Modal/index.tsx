import Modal from "react-bootstrap/Modal";
import "./modal.css";
import PropTypes, {InferProps} from "prop-types";

function ModalElm({show, kycTwitter}: InferProps<typeof ModalElm.propTypes>) {
  return (
      <Modal
          show={show}
          backdrop="static"
          keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="justify-content-between w-100 d-flex">
              <img src="assets/svg/CloseButton.svg" alt="" />
              <img src="assets/svg/BabbuCityIconNew.svg" alt="" />
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-Twitter--connect">
            <h5>Twitter connect:</h5>
            <p>
              Please connect your Twitter/X to participate in the airdrop! We do
              not interfere with your account. Note that each connected account
              cannot be changed.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="footer-twitter--connect" onClick={kycTwitter}>CONNECT</button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalElm;

ModalElm.propTypes = {
  kycTwitter: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
}
