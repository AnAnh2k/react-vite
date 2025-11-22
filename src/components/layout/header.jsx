// import "./header.css";
import { Menu, message } from "antd";
import {
  BookOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { logoutApi } from "../../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (location && location.pathname) {
      const allRoutes = ["users", "books", "login", "register"];
      const currentRoute = allRoutes.find(
        (item) => `/${item}` === location.pathname
      );

      if (currentRoute) {
        setCurrent(currentRoute);
      } else {
        setCurrent("home");
      }
    }
  }, [location]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await logoutApi();
    if (res.data) {
      //clear data
      localStorage.removeItem("access_token");
      setUser({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      });
      message.success("Logout success");

      //redirect to home
      navigate("/");
    }
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>User</Link>,
      key: "users",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Book</Link>,
      key: "books",
      icon: <BookOutlined />,
    },

    ...(!user.id
      ? [
          {
            label: "Tài khoản ",
            key: "account",
            icon: <SettingOutlined />,
            children: [
              {
                label: <Link to={"/login"}>Login</Link>,
                key: "login",
                icon: <LoginOutlined />,
              },
              {
                label: <Link to={"/register"}>Register</Link>,
                key: "register",
                icon: <UserAddOutlined />,
              },
            ],
          },
        ]
      : [
          {
            label: `Welcome ${user.fullName}`,
            key: "setting",
            icon: <UserOutlined />,
            children: [
              {
                label: (
                  <Link
                    to={"/login"}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </Link>
                ),
                key: "logout",
                icon: <LogoutOutlined />,
              },
            ],
          },
        ]),
  ];
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};
export default Header;
