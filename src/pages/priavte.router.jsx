import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from "react-router-dom";
import { notification } from "antd";

const PrivateRoute = (props) => {
  const { user } = useContext(AuthContext);

  if (user && user.id) {
    return <>{props.children}</>;
  } else {
    notification.error({
      message: "Lỗi truy cập",
      description: "Bạn cần đăng nhập để truy cập!",
    });
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
