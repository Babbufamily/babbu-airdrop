import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12")}>
              {windowWidth > 1200 ? (
                <img
                  className={cx("img--logo--footer")}
                  src="assets/svg/BabbuLogoFooter.svg"
                  alt=""
                />
              ) : (
                <img
                  className={cx("img--logo--footer w-50")}
                  src="assets/svg/BabbuLogoRps.svg"
                  alt=""
                />
              )}
              <div className={cx("download--app")}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.airdropapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/svg/GooglePlayBadge.svg" alt="" />
                </a>

                <a
                  href="https://testflight.apple.com/join/Q7owh4aC"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="assets/svg/AppStoreBadge.svg" alt="" />
                </a>
              </div>
              <p className={cx("mb-0")}>
                © 2023 BabbuCity. Made with ❤️ for Fireal Capital.
              </p>
            </div>
            <div className={cx("col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12")}>
              <div className={cx("row")}>
                <div
                  className={cx(
                    "col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12  mt-5"
                  )}
                >
                  <p className={cx("mb-0")}>Connect</p>
                  <div>
                    <a
                      href="https://lab.babbu.io/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      Privacy Policy
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://lab.babbu.io/terms-and-conditions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      {" "}
                      Terms & Conditions
                    </a>
                  </div>
                  <div>
                    <a
                      href="http://https://lab.babbu.io/support-ticket/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      {" "}
                      Team Support ❤️
                    </a>
                  </div>
                </div>
                <div
                  className={cx(
                    "col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12  mt-5"
                  )}
                >
                  <p className={cx("mb-0")}>Follow Us on Twitter</p>
                  <div>
                    <a
                      href="https://twitter.com/BabbuMetaverse"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      <img
                        className={cx("me-1")}
                        src="assets/svg/IconTwitter.svg"
                        alt=""
                      />
                      @BabbuCity
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://twitter.com/BabbuDevteam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      <img
                        className={cx("me-1")}
                        src="assets/svg/IconTwitter.svg"
                        alt=""
                      />
                      @BabbuDevteam
                    </a>
                  </div>
                </div>
                <div
                  className={cx(
                    "col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12  mt-5"
                  )}
                >
                  <p className={cx("mb-0")}>Connect</p>
                  <div>
                    <a
                      href="https://t.me/Babbu_Chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      {" "}
                      <img
                        className={cx("me-1")}
                        src="assets/svg/IconTelegram.svg"
                        alt=""
                      />
                      Babbu Global Chat
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://t.me/Babbu_Chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("text-decoration")}
                      style={{ fontWeight: "600" }}
                    >
                      {" "}
                      <img
                        className={cx("me-1")}
                        src="assets/svg/IconTelegram.svg"
                        alt=""
                      />
                      Global Exchange Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
