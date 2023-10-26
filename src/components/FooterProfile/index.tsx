import classNames from "classnames/bind";
import styles from "./FooterProfile.module.scss";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);
function FooterProfile() {
  const ListMenuMobile = [
    {
      img: "assets/svg/Home.svg",
      contentText: "Overview",
      path: "/overview",
    },
    {
      img: "assets/svg/Profile.svg",
      contentText: "Profile",
      path: "/profile",
    },
    // {
    //   img: "assets/svg/ClaimRewa.svg",
    //   contentText: "Claim",
    //   path: "/ClaimReward",
    // },
    {
      img: "assets/svg/Mentision.svg",
      contentText: "Mentions",
      path: "/mentions",
    },
  ];

  const location = useLocation();
  const currentPathName = location?.pathname ?? "";

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("from--menu--footer--profile")}>
          <div className={cx("row")}>
            {ListMenuMobile.map((items) => {
              const isActive = currentPathName === items.path;
              const menuClasses = cx("col-4", "text-center", "col-active", {
                active: isActive,
              });

              return (
                <div className={menuClasses} key={items.path}>
                  <Link to={items.path}>
                    <div className={cx("menu-footer--profile")}>
                      <img src={items.img} alt="" />
                      <div>{items.contentText}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterProfile;
