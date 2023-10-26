// import classNames from "classnames/bind";
// import styles from "./ClaimReward.module.scss";
// import SideBarProfile from "../../../components/SideBarProfile";
// import ButtonReuse from "../../../components/Button";
// import FooterProfile from "../../../components/FooterProfile";
// import { useEffect, useState } from "react";

// const cx = classNames.bind(styles);
// function ClaimReward() {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   return (
//     <div className={cx("wrapper")}>
//       <div className={cx("inner")}>
//         <div className={cx("container")}>
//           <div className={cx("row")}>
//             <div
//               className={cx("col-xl-3 col-lg-3 col-md-12  col-sm-12 col-12")}
//             >
//               <SideBarProfile />
//             </div>
//             <div
//               className={cx(
//                 "col-xl-9 col-lg-9 col-md-12  col-sm-12 col-12 ps-4 pe-4"
//               )}
//             >
//               <div className={cx("ClaimReward")}>
//                 <ButtonReuse btnVerify100>
//                   <div className={cx("d-flex align-items-center")}>
//                     <img
//                       className={cx("me-3")}
//                       src="assets/svg/Warning.svg"
//                       alt=""
//                     />
//                     Bắt lỗi nếu sai ví đang kết nối
//                   </div>
//                   <img src="assets/svg/ArrowRight.svg" alt="" />
//                 </ButtonReuse>
//                 <ButtonReuse btnVerify100 margin={"24px 0px"}>
//                   <div className={cx("d-flex align-items-center")}>
//                     <img
//                       className={cx("me-3")}
//                       src="assets/svg/Warning.svg"
//                       alt=""
//                     />
//                     Điều kiện VERIFY: Holder 620 $bucoin trong ví - nếu không
//                     hiển thị thông báo Pop-up
//                   </div>
//                   <img src="assets/svg/ArrowRight.svg" alt="" />
//                 </ButtonReuse>
//                 <h2>Claim Reward</h2>
//                 <p>MY CLAIMS</p>
//                 {windowWidth > 1200 ? (
//                   <div className={cx("row")}>
//                     <div className={cx("col-4")}>
//                       <div className={cx("box--Claim")}>
//                         <h6>VERIFICATION STATUS</h6>
//                         <button className={cx("btn--VERIFICATION")}>
//                           VERIFY
//                         </button>
//                       </div>
//                     </div>
//                     <div className={cx("col-4")}>
//                       <div className={cx("box--Claim")}>
//                         <h6>VERIFICATION STATUS</h6>
//                         <h3>53,498</h3>
//                       </div>
//                     </div>
//                     <div className={cx("col-4")}>
//                       <div className={cx("box--Claim")}>
//                         <h6>VERIFICATION STATUS</h6>
//                         <h3>0x0C...6943</h3>
//                         <button className={cx("btn--VERIFICATION")}>
//                           WRONG WALLET
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className={cx("box--green--rps")}>
//                     <div className={cx("box--line--green")}>
//                       <h6>VERIFICATION STATUS</h6>
//                       <button className={cx("btn--VERIFICATION")}>
//                         VERIFY
//                       </button>
//                     </div>
//                     <div className={cx("box--line--green")}>
//                       <h6>VERIFICATION STATUS</h6>
//                       <h3>53,498</h3>
//                     </div>
//                     <div className={cx("box--line--green")}>
//                       <h6>VERIFICATION STATUS</h6>
//                       <div className={cx("row")}>
//                         <div
//                           className={cx(
//                             "col-xl-7 col-lg-7 col-md-7 col-sm-6 col-12"
//                           )}
//                         >
//                           <h3>0x0C...6943</h3>
//                         </div>
//                         <div
//                           className={cx(
//                             "col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12"
//                           )}
//                         >
//                           <button className={cx("btn--VERIFICATION")}>
//                             WRONG WALLET
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div className={cx("form--table--claim", "scrollable-table")}>
//                   <table className={cx("table")}>
//                     <thead>
//                       <tr>
//                         <th scope="col">Point</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">State Points</th>
//                         <th scope="col">$Butip Tokens</th>
//                         <th scope="col">Updated At</th>
//                         <th scope="col">Claim</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <th scope="row">1</th>
//                         <td>Mark</td>
//                         <td>Otto</td>
//                         <td>@mdo</td>
//                         <td>Otto</td>
//                         <td>@mdo</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">2</th>
//                         <td>Jacob</td>
//                         <td>Thornton</td>
//                         <td>@fat</td>
//                         <td>Otto</td>
//                         <td>@mdo</td>
//                       </tr>
//                       <tr>
//                         <th scope="row">3</th>
//                         <td>Larry the Bird</td>
//                         <td>@twitter</td>
//                         <td>Otto</td>
//                         <td>@mdo</td>
//                         <td>Otto</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//                 <h5>
//                   Sau mỗi STATE, Hệ thống của chúng tôi sẽ mất vài ngày để lọc
//                   qua các bot và thực hiện điều chỉnh điểm. Vui lòng kiểm tra
//                   lại thường xuyên. Số lượng $BuTip có thể thay đổi sau khi hệ
//                   thống tính toán hoàn thành.
//                 </h5>
//                 <h5>
//                   After each STATE, our system will take a few days to filter
//                   through the bots and make score adjustments. Please check back
//                   frequently. The amount of $BuTip may change after the
//                   calculation is completed.
//                 </h5>
//               </div>
//             </div>
//           </div>
//         </div>
//         <FooterProfile />
//       </div>
//     </div>
//   );
// }

// export default ClaimReward;
