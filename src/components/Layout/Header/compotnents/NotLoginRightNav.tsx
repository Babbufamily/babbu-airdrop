import ButtonReuse from "../../../Button";
import classNames from "classnames/bind";
import styles from "../Header.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export default function NotLoginRightNav() {
  const navigate = useNavigate();

  return (
    <div
      className={cx(
        "col-xl-4 col-lg-12 col-md-12  col-sm-12 col-12 d-flex align-items-center justify-content-end"
      )}
    >
      {/*<ButtonReuse*/}
      {/*    background={"#000000"}*/}
      {/*    padding={"9px 40px"}*/}
      {/*    borderRadius={"12px"}*/}
      {/*    color={"#fff"}*/}
      {/*    fontSize={"12px"}*/}
      {/*    fontWeight={"600"}*/}
      {/*    margin={"0px 12px"}*/}
      {/*    onClick={() => {*/}
      {/*      window.open('https://testworld.babbu.io/register', '_blank')*/}
      {/*    }}*/}
      {/*>*/}
      {/*  Sign Up*/}
      {/*</ButtonReuse>*/}
      <ButtonReuse
        background={"#000000"}
        padding={"9px 40px"}
        borderRadius={"12px"}
        color={"#fff"}
        fontSize={"12px"}
        fontWeight={"600"}
        margin={"0px 12px"}
        onClick={() => navigate("/login")}
      >
        Sign In
      </ButtonReuse>
      <div>EN</div>
    </div>
  );
}
