// import classNames from "classnames/bind";
// import styles from "./Profile.module.scss";
// // import { useEffect, useState } from "react";
// import Overview from "./Overview";
// import ProfileCpn from "./Profile";
// import Mentions from "./Mentions";
// import { useConnection } from "../../redux/connection";

// const cx = classNames.bind(styles);
// function Profile() {
//   const { connection, onSetHomeTabActive } = useConnection();
//   const { homeTabActive } = connection;
//   // const [showFooter, setShowFooter] = useState(false);

//   const handleTabClick = (id: any) => {
//     onSetHomeTabActive(id);
//   };

//   const ListMenuMobile = [
//     {
//       img: "assets/svg/Home.svg",
//       contentText: "Overview",
//     },
//     {
//       img: "assets/svg/Profile.svg",
//       contentText: "Profile",
//     },
//     {
//       img: "assets/svg/Mentision.svg",
//       contentText: "Mentions",
//     },
//   ];

//   return (
//     <div className={cx("wrapper")}>
//       <div className={cx("inner")}>
//         <div className={cx("container")}>
//           <div className={cx("row")}>
//             <div
//               className={cx("col-xl-3 col-lg-3 col-md-12  col-sm-12 col-12")}
//             >
//               <div className={cx("sideBar--Profile")}>
//                 <ul className={cx("tabsPage")}>
//                   <li
//                     className={cx({ active: homeTabActive === 1 })}
//                     onClick={() => handleTabClick(1)}
//                   >
//                     <div>
//                       <img src="assets/svg/Home.svg" alt="" />
//                       Overview
//                     </div>
//                   </li>
//                   <li
//                     className={cx({ active: homeTabActive === 2 })}
//                     onClick={() => handleTabClick(2)}
//                   >
//                     <div>
//                       <img src="assets/svg/Profile.svg" alt="" />
//                       Profile
//                     </div>
//                   </li>
//                   <li
//                     className={cx({ active: homeTabActive === 3 })}
//                     onClick={() => handleTabClick(3)}
//                   >
//                     <div>
//                       <img src="assets/svg/Mentision.svg" alt="" />
//                       Mentions
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div
//               className={cx("col-xl-9 col-lg-9 col-md-12  col-sm-12 col-12")}
//             >
//               <div>
//                 {homeTabActive === 1 && <Overview />}
//                 {homeTabActive === 2 && <ProfileCpn />}
//                 {homeTabActive === 3 && <Mentions />}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* {showFooter && ( */}
//       <div className={cx("from--menu--footer--profile")}>
//         <div className={cx("row")}>
//           {ListMenuMobile.map((items, index) => (
//             <div key={index} className={cx("col-4")}>
//               <div
//                 className={cx({ active: homeTabActive >= index + 1 })}
//                 onClick={() => handleTabClick(index + 1)}
//               >
//                 <div
//                   className={cx("menu-footer--profile", {
//                     active: homeTabActive === index + 1,
//                   })}
//                   onClick={() => handleTabClick(index + 1)}
//                 >
//                   <img src={items.img} alt="" />
//                   <div>{items.contentText}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* )} */}
//     </div>
//   );
// }

// export default Profile;
