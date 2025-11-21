import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountApi } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const res = await getAccountApi();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  };
  return (
    <>
      {isAppLoading === true ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {" "}
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
