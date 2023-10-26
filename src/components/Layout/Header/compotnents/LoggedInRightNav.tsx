import ButtonReuse from "../../../Button";
import classNames from "classnames/bind";
import styles from "../Header.module.scss";
import { useConnection } from "../../../../redux/connection";
import { minimizeText } from "../../../../assets/Constant.tsx";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CiWarning } from "react-icons/ci";

const cx = classNames.bind(styles);
export default function LoggedInRightNav() {
  const { connection, onLogout } = useConnection();
  const { chain } = useNetwork();
  const { openChainModal } = useChainModal();
  const { disconnectAsync } = useDisconnect();

  const { userInfo } = connection;
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const goToProfile = () => {
    setOpenDropdown(false);
    navigate("/profile");
  };

  const handleLogout = async () => {
    setOpenDropdown(false);
    onLogout();
    await disconnectAsync();
    navigate("/login");
  };

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      //@ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={cx(
        "col-xl-4 col-lg-12 col-md-12  col-sm-12 col-12 d-flex align-items-center justify-content-end position-relative"
      )}
    >
      {chain && (
        <ButtonReuse
          padding={"7px 10px "}
          borderRadius={"8px"}
          border={"2px solid #000000"}
          onClick={openChainModal}
          color={"red"}
        >
          {chain?.network === "bsc" ? (
            <img src="assets/svg/BNBDARK.svg" alt="" />
          ) : chain?.network === "optimism" ? (
            <img src="assets/svg/op-icon.svg" alt="" />
          ) : chain?.network === "arbitrum" ? (
            <img src="assets/svg/ab-icon.svg" alt="" />
          ) : chain?.network === "matic" ? (
            <img src="assets/svg/pl-icon.svg" alt="" />
          ) : chain?.network === "bsc-testnet" ? (
            <img src="assets/svg/BNBDARK.svg" alt="" />
          ) : (
            <div>
              <CiWarning size={"22px"} />
            </div>
          )}
        </ButtonReuse>
      )}
      <ButtonReuse
        background={"#000000"}
        padding={"9px 15px"}
        borderRadius={"12px"}
        color={"#fff"}
        fontSize={"18px"}
        fontWeight={"600"}
        margin={"0px 6px"}
        iconRight={"assets/svg/ArowBottomWhite.svg"}
        onClick={() => setOpenDropdown(!openDropdown)}
        display={"flex"}
        alignItems={"center"}
      >
        {isConnected && userInfo?.walletAddress
          ? minimizeText(userInfo?.walletAddress)
          : minimizeText(userInfo?._id)}
      </ButtonReuse>
      {openDropdown && (
        <div ref={dropdownRef} className={cx("box--dropdown")}>
          <h3 onClick={goToProfile}>My Profile</h3>
          <h3 onClick={handleLogout}>Disconnect</h3>
        </div>
      )}
    </div>
  );
}
