import classNames from "classnames/bind";
import styles from "./SideBarProfile.module.scss";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);
const navItems = [
  {
    text: "Overview",
    icon: "assets/svg/Home.svg",
    path: "/overview",
  },
  {
    text: "Profile",
    icon: "assets/svg/Profile.svg",
    path: "/profile",
  },

  {
    text: "Mentions",
    icon: "assets/svg/Mentision.svg",
    path: "/mentions",
  },
];

function SideBarProfile() {
  const location: any = useLocation();
  const currentPathName = location?.pathname ?? "";
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("sideBar--Profile")}>
          <ul className={cx("tabsPage")}>
            {navItems.map((item) => {
              return (
                <li
                  key={item.path}
                  className={currentPathName === item.path ? cx("active") : ""}
                >
                  <Link to={item.path}>
                    <img src={item.icon} alt={item.text} />
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBarProfile;
