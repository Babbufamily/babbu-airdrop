import classNames from "classnames/bind";
import styles from "./Mentions.module.scss";
import { useEffect } from "react";
import AirDropApi from "../../../axios/AirDropApi.tsx";
import { useQuery } from "react-query";
import moment from "moment";
import BoxGreen from "../../../components/BoxGreen.tsx";
import { numberWithCommas } from "../../../assets/Constant.tsx";
import SideBarProfile from "../../../components/SideBarProfile/index.tsx";
import FooterProfile from "../../../components/FooterProfile/index.tsx";

const cx = classNames.bind(styles);

function Mentions() {
  useEffect(() => {
    AirDropApi.twitterPostMineAsync().then(() => {
      AirDropApi.updateReactions().then();
    });
  }, []);

  const { data: twitterPostedData, isSuccess: getDataTwitterSs } = useQuery(
    ["airDropApi.twitterPostMine"],
    () => AirDropApi.twitterPostMine()
  );

  const { data: dataCountMine, isSuccess: getDataCountSs } = useQuery(
    ["airDropApi.mentionCount"],
    () => AirDropApi.mentionCount()
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div
              className={cx("col-xl-3 col-lg-3 col-md-12  col-sm-12 col-12")}
            >
              <SideBarProfile />
            </div>
            <div
              className={cx(
                "col-xl-9 col-lg-9 col-md-12  col-sm-12 col-12 ps-4 pe-4"
              )}
            >
              <div className={cx("Overview")}>
                <div
                  className={cx(
                    "d-flex align-items-center justify-content-between flex-wrap title--content"
                  )}
                >
                  <h2 className={cx("mb-0")}>My Mentions</h2>
                  {/*<h6 className={cx("m-0")}>01/01/2023 - 10/01/2023</h6>*/}
                </div>
                <div className={cx("row")}>
                  {getDataCountSs && (
                    <>
                      <BoxGreen
                        title={"DAILY KICKBACKS"}
                        content={dataCountMine?.data["reply-kickback"] || 0}
                      />
                      <BoxGreen
                        title={"DAILY TWEETS"}
                        content={dataCountMine?.data["original-tweet"] || 0}
                      />
                      <BoxGreen
                        title={"DAILY QUOTES"}
                        content={dataCountMine?.data?.quote || 0}
                      />
                      <BoxGreen
                        title={"DAILY REPLIES"}
                        content={dataCountMine?.data?.reply || 0}
                      />
                    </>
                  )}
                </div>
                <div className={cx("form--table", "scrollable-table")}>
                  <table className={cx("table")}>
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Type</th>
                        <th scope="col">Twitter</th>
                        <th scope="col">Views</th>
                        <th scope="col">Interactions</th>
                        <th scope="col">$BuTip</th>
                        <th scope="col">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getDataTwitterSs &&
                        twitterPostedData?.data?.map(
                          (e: any, index: number) => (
                            <tr key={index}>
                              <th scope="row">#{index + 1}</th>
                              <td>{e.type}</td>
                              <td>
                                <a href={e.postUrl} target={"_blank"}>
                                  View on Twitter
                                </a>
                              </td>
                              <td>{e.viewCount}</td>
                              <td>
                                {e.likeCount +
                                  e.retweetCount +
                                  e.replyCount +
                                  e.quoteCount}
                              </td>
                              <td>{numberWithCommas(e.buTips, 2)}</td>
                              <td>
                                {moment(e.createdAt).format(
                                  "MM/D/YYYY, h:mm:ss A"
                                )}
                              </td>
                            </tr>
                          )
                        )}
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

export default Mentions;
