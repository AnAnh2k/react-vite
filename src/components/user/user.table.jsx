import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import UpdateUserModal from "./update.user.modal";
import { useState } from "react";
import ViewUserModal from "./view.user.detail";
import { deleteUserApi } from "../../services/api.service";

const UserTable = (props) => {
  const { dataUser, loadUser } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const confirm = async (userId) => {
    const res = await deleteUserApi(userId);
    if (res.data) {
      console.log("res data,", res.data);
      notification.success({
        message: "Update user",
        description: `Update user successfully`,
      });
      await loadUser();
    } else {
      notification.error({
        message: "Update user",
        description: JSON.stringify(res.message) || "Update user failed",
      });
    }
  };

  const columns = [
    {
      title: "ID",
      key: "_id",
      render: (_, record) => {
        return (
          <>
            <a
              href="#"
              onClick={() => {
                setDataDetail(record);
                setIsDetailOpen(true);
              }}
            >
              {record._id}
            </a>
          </>
        );
      },
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
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: "20px" }}>
            <EditOutlined
              onClick={() => {
                setDataUpdate(record);
                setIsModalUpdateOpen(true);
              }}
              style={{ cursor: "pointer", color: "orange" }}
            />

            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => {
                confirm(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => {
                  setUserId(record._id);
                }}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />

      <ViewUserModal
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
    </>
  );
};

export default UserTable;
