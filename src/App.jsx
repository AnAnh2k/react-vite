import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getAccountApi } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";

const App = () => {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const res = await getAccountApi();
    if (res.data) {
      setUser(res.data.user);
      console.log(">>>>check data user: ", res.data);
    }
  };
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
