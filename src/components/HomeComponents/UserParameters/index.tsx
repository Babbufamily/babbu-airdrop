import classNames from "classnames/bind";
import styles from "./UserParameters.module.scss";
import {useQuery} from "react-query";
import AirDropApi from "../../../axios/AirDropApi.tsx";
import {numberWithCommas} from "../../../assets/Constant.tsx";
import moment from "moment/moment";

const cx = classNames.bind(styles);
function UserParameters() {
  const {data: totalUserInfo} = useQuery(
      ["airDropApi.getUserCount"],
      () => AirDropApi.getUserCount(),
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("row")}>
          <div
              className={cx(
                  "col-xl-3 col-lg-3 col-md-6  col-sm-12 col-12 mt-3 text-center"
              )}
          >
            <h3>{numberWithCommas(totalUserInfo?.data?.onlineUsers)}</h3>
            <h4>Daily Active Users</h4>
          </div>
          <div
              className={cx(
                  "col-xl-3 col-lg-3 col-md-6  col-sm-12 col-12 mt-3 text-center"
              )}
          >
            <h3>{numberWithCommas(totalUserInfo?.data?.totalUsers)}</h3>
            <h4>Total Users</h4>
          </div>
          <div
              className={cx(
                  "col-xl-3 col-lg-3 col-md-6  col-sm-12 col-12 mt-3 text-center"
              )}
          >
            <h3>{numberWithCommas(totalUserInfo?.data?.hasTwitter)}</h3>
            <h4>Mem on Twitter/X</h4>
          </div>
          <div
            className={cx(
              "col-xl-3 col-lg-3 col-md-6  col-sm-12 col-12 mt-3",
              "css-rps"
            )}
          >
            <p>
              Updated at <br /> {moment().utc().format("YYYY-MM-DD HH:mm:ss")} UTC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserParameters;
