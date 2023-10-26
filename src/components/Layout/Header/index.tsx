import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import LoggedInRightNav from "./compotnents/LoggedInRightNav.tsx";
import NotLoginRightNav from "./compotnents/NotLoginRightNav.tsx";
import { useConnection } from "../../../redux/connection";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiBookFill } from "react-icons/pi";
import { BsTwitter } from "react-icons/bs";
import { HiSupport } from "react-icons/hi";

const cx = classNames.bind(styles);

const Header = () => {
  const listMenuHeader = [
    {
      title: "Home",
      iconLeft: "",
      iconRight: "",
      path: "/",
    },
    {
      title: "Bwallet",
      iconLeft: (
        <img
          className={cx("icon-left")}
          src="assets/svg/HeaderBWallet.svg"
          alt=""
        />
      ),
      iconRight: "",
      path: "https://docs.babbu.io/babbu-network/buwallet",
    },
    {
      title: "BuTip",
      iconLeft: (
        <img
          className={cx("icon-left")}
          src="assets/svg/HeaderButip.svg"
          alt=""
        />
      ),
      iconRight: "",
      path: "https://docs.babbu.io/earn-usdbutip/socialfi-network",
    },
    {
      title: "Community",
      iconLeft: "",
      iconRight: (
        <img
          className={cx("icon-right")}
          src="assets/svg/ArrowBot.svg"
          alt=""
        />
      ),
      hoverDropdown: (
        <nav>
          <ul className={cx("dropdown--menu")}>
            <li className={cx("menu-item--")}>
              <a
                href="https://lab.babbu.io/blog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PiBookFill size={20} />
                <span>Blog</span>
              </a>
            </li>
            <li className={cx("menu-item--")}>
              <a
                href="https://twitter.com/BabbuCity"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter size={20} />
                <span>Twitter (X)</span>
              </a>
            </li>
            <li className={cx("menu-item--")}>
              <a
                href="https://lab.babbu.io/support/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiSupport size={20} />
                <span>Support Team</span>
              </a>
            </li>
          </ul>
        </nav>
      ),
    },
    {
      title: "Help",
      iconLeft: "",
      iconRight: "",
    },
  ];

  const { connection } = useConnection();
  const { jwtToken } = connection;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuHeaderVisible, setMenuHeaderVisible] = useState(false);

  const handleToggleMenuHeader = () => {
    setMenuHeaderVisible(!menuHeaderVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner", "container")}>
        {windowWidth > 1200 ? (
          <div className={cx("row")}>
            {" "}
            <div
              className={cx(
                "col-xl-5 col-lg-6 col-md-12  col-sm-12 col-12 d-flex ",
                "hover--header"
              )}
            >
              {listMenuHeader.map((menuItem, index) => (
                <>
                  <div className={cx("menu-item-hover")}>
                    <Link
                      to={menuItem.path as string}
                      className={cx("menu-item", { "first-item": index === 0 })}
                      key={index}
                    >
                      {menuItem.iconLeft && <span>{menuItem.iconLeft}</span>}
                      <span>{menuItem.title}</span>
                      {menuItem.iconRight && <span>{menuItem.iconRight}</span>}
                    </Link>
                    {menuItem.hoverDropdown}
                  </div>
                </>
              ))}
            </div>
            <Link
              to={"/"}
              className={cx(
                "col-xl-3 col-lg-6 col-md-12  col-sm-12 col-12 text-center"
              )}
            >
              <img
                className={cx("icon-right")}
                src="assets/svg/BabbuLogoBlackHeader.svg"
                alt=""
              />
            </Link>
            {jwtToken ? <LoggedInRightNav /> : <NotLoginRightNav />}
          </div>
        ) : (
          <div
            className={cx(
              "row",
              "d-flex",
              "align-items-center",
              "justify-content-between"
            )}
          >
            <div className={cx("col-lg-6 col-md-6 col-sm-6 col-3")}>
              <div className={cx("d-flex", "align-items-center")}>
                <div>
                  <img
                    onClick={handleToggleMenuHeader}
                    src="assets/svg/ListMenuHeader.svg"
                    alt="Icon Menu Header"
                  />
                </div>
                <Link to={"/"}>
                  <img
                    className={cx("ms-3")}
                    src="assets/svg/BabbuLogoRps.svg"
                    alt="Logo Header rps"
                  />
                </Link>
              </div>
            </div>
            <div className={cx("col-lg-6 col-md-6 col-sm-6 col-9")}>
              <div className={cx("d-flex", "justify-content-end")}>
                {jwtToken ? <LoggedInRightNav /> : <NotLoginRightNav />}
              </div>
            </div>
            <div
              className={cx("menu-header", {
                visible: menuHeaderVisible,
              })}
              onClick={handleToggleMenuHeader}
            >
              {listMenuHeader.map((menuItem, index) => (
                <Link
                  to={menuItem.path as string}
                  className={cx("menu-item", "menu-item-rps", {
                    "first-item": index === 0,
                  })}
                  key={index}
                >
                  {menuItem.iconLeft && <span>{menuItem.iconLeft}</span>}
                  <span>{menuItem.title}</span>
                  {menuItem.iconRight && <span>{menuItem.iconRight}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
