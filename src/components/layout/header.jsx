// import "./header.css";
import { Menu } from "antd";
import {
  BookOutlined,
  HomeOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("home");
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
      label: <Link to={"/register"}>Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
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
