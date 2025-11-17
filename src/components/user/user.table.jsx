import { Table } from "antd";
import { fetchAllUserApi } from "../../services/api.service";
import { useState } from "react";

const UserTable = () => {
  const [dataUser, setDataUser] = useState([
    {
      _id: "1",
      fullName: "An Duc Anh",
      email: "anducanh@gmail.com",
      address: "Hà Nội",
    },
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const loadUser = async () => {
    const res = await fetchAllUserApi();
    // setDataUser(res.data);
  };

  loadUser();

  return <Table columns={columns} dataSource={dataUser} />;
};

export default UserTable;
