// import "./header.css";
import { Menu } from "antd";
import {
  BookOutlined,
  HomeOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState("home");

  const data = useContext(AuthContext);

  console.log(">>>>check data:", data);

  const onClick = (e) => {
    console.log("click ", e);
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

    {
      label: "Setting",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        { label: <Link to={"/login"}>Login</Link>, key: "login" },
        { label: <Link to={"/register"}>Register</Link>, key: "register" },
      ],
    },
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
