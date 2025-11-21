// import "./header.css";
import { Menu } from "antd";
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
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const { user, setUser } = useContext(AuthContext);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>User</Link>,
      key: "user",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Book</Link>,
      key: "book",
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
                  <Link to={"/login"} onClick={() => {}}>
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
