import classNames from "classnames/bind";
import styles from "./Overview.module.scss";

import { useConnection } from "../../../redux/connection";
import {
  calculateTimeLeft,
  defaultDataTimeLeft,
  numberWithCommas,
} from "../../../assets/Constant.tsx";
import { formatUnits } from "viem";
import { useEffect, useState } from "react";
import { ITimeLeft } from "../../../assets/Interface.ts";
import { useQuery } from "react-query";
import AirDropApi from "../../../axios/AirDropApi.tsx";
import BoxGreen from "../../../components/BoxGreen.tsx";
import moment from "moment";
import SideBarProfile from "../../../components/SideBarProfile/index.tsx";
import FooterProfile from "../../../components/FooterProfile/index.tsx";

const cx = classNames.bind(styles);
function Overview() {
  const { connection } = useConnection();
  const { currentState, userInfo, currentStateInfo } = connection;

  const [timeLeft, setTimeLeft] = useState<ITimeLeft>(defaultDataTimeLeft);
  const [countDownTime, setCountDownTime] = useState<number>(
    new Date().getTime()
  );
  const [startTime, setStartTime] = useState<number>(new Date().getTime());

  const { data: totalPostedTwitter } = useQuery(
    ["airDropApi.totalPostedTwitter"],
    () => AirDropApi.getMyPosted()
  );

  const { data: userRanking, isSuccess: getUserRankingSs } = useQuery(
    ["airDropApi.overViewRanking"],
    () => AirDropApi.overViewRanking()
  );
  const { data: rewardTwitter } = useQuery(
    ["airDropApi.getTotalRewardButipTwitter"],
    () => AirDropApi.getTotalRewardButipTwitter()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(countDownTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (!currentStateInfo) return;
    setCountDownTime(
      Number(formatUnits(currentStateInfo?.endRoundTime, 0)) * 1000
    );
    setStartTime(
      Number(formatUnits(currentStateInfo?.startRoundTime, 0)) * 1000
    );
  }, [currentStateInfo]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12")}>
              <SideBarProfile />
            </div>
            <div
              className={cx(
                "col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 ps-4 pe-4"
              )}
            >
              <div className={cx("Overview")}>
                <div
                  className={cx(
                    "d-flex align-items-center justify-content-between flex-wrap"
                  )}
                >
                  <h2 className={cx("mb-0")}>OVERVIEW: STATE {currentState}</h2>
                  <h6 className={cx("m-0")}>
                    {moment(startTime).format("MM/D/YYYY")} -{" "}
                    {moment(countDownTime).format("MM/D/YYYY")}
                  </h6>
                </div>
                <div className={cx("row")}>
                  <BoxGreen
                    title={"MY $BUTIP"}
                    content={
                      numberWithCommas(
                        userInfo?.babbuBalance +
                          (userInfo?.buTipsEstimated || 0),
                        2
                      ) || 0
                    }
                  />
                  <BoxGreen
                    title={"MY POSTED"}
                    content={totalPostedTwitter?.data?.count || 0}
                  />
                  <BoxGreen
                    title={`TOTAL STATE ${currentState}`}
                    content={numberWithCommas(
                      rewardTwitter?.data?.total || 0,
                      2
                    )}
                  />
                  <BoxGreen
                    title={"TIME REMAINING"}
                    content={`${timeLeft.days || 0}:${timeLeft.hours || 0}:${
                      timeLeft.minutes || 0
                    }:${timeLeft.seconds || 0}`}
                  />
                </div>
                <div className={cx("form--table", "scrollable-table")}>
                  <table className={cx("table")}>
                    <thead>
                      <tr>
                        <th scope="col">Ranking</th>
                        <th scope="col">Twitter User</th>
                        <th scope="col">BuPower</th>
                        <th scope="col">$BuTip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getUserRankingSs &&
                        userRanking?.data?.map((e: any, index: number) => (
                          <tr key={index}>
                            <th scope="row">#{index + 1}</th>
                            <td>
                              <a
                                style={{ color: "#1463FF" }}
                                href={e.twitterUrl}
                                target={"_blank"}
                              >
                                <img
                                  src={"assets/svg/babbu-icon-circle.svg"}
                                  alt={""}
                                />
                                {e.twitterUsername}
                              </a>
                            </td>
                            <td>{numberWithCommas(e.power, 0)}</td>
                            <td>{numberWithCommas(e.buTips, 2)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterProfile />
      </div>
    </div>
  );
}

export default Overview;
