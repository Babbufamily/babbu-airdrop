import classNames from "classnames/bind";
import styles from "./SideBarProfile.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

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
  // {
  //   text: "Claim Reward",
  //   icon: "assets/svg/ClaimRewa.svg",
  //   path: "/ClaimReward",
  // },
  {
    text: "Mentions",
    icon: "assets/svg/Mentision.svg",
    path: "/mentions",
  },
];

function SideBarProfile() {
  const navigate = useNavigate();

  const handleChangePath = (path: string) => {
    navigate(path);
  };
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
                  onClick={() => handleChangePath(item.path)}
                  key={item.path}
                  className={currentPathName === item.path ? cx("active") : ""}
                >
                  <div>
                    <img src={item.icon} alt={item.text} />
                    {item.text}
                  </div>
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
