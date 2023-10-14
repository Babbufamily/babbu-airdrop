import { Routes, Route } from "react-router-dom";
import HomePage from "../page/HomePage";
import { updater } from "../service/Updater.tsx";
import Login from "../page/Login/index.tsx";
import VerifyTwitter from "../page/VerifyTwitter";
import TwitterLoginCallBack from "../page/TwitterLoginCallBack.tsx";
import { useConnection } from "../redux/connection";
import Overview from "../page/Profile/Overview/index.tsx";
import Mentions from "../page/Profile/Mentions/index.tsx";
import ProfileCpn from "../page/Profile/Profile/index.tsx";

function MainRoutes() {
  const { connection } = useConnection();
  const { jwtToken } = connection;

  return (
    <Routes>
      {!jwtToken && (
        <>
          <Route path="/login" element={<Login />} />
        </>
      )}
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<HomePage />} />
      <Route
        path="/twitter-login-callback"
        element={<TwitterLoginCallBack />}
      />
      {jwtToken && (
        <>
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/verify_twitter" element={<VerifyTwitter />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/mentions" element={<Mentions />} />
          <Route path="/profile" element={<ProfileCpn />} />
        </>
      )}
    </Routes>
  );
}

export default updater(MainRoutes);
