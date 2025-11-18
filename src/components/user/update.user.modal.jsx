import { useEffect, useState } from "react";

import { Input, Modal, notification } from "antd";
import { updateUserApi } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      setFullName(dataUpdate.fullName);
      setId(dataUpdate._id);
      setPhoneNumber(dataUpdate.phone);
    }
  }, [dataUpdate]);

  console.log("check dataupdate: ", dataUpdate);
  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setFullName("");
    setPhoneNumber("");
    setDataUpdate(null);
  };

  const handleSubmitBtn = async () => {
    const res = await updateUserApi(id, fullName, phoneNumber);
    if (res.data) {
      console.log("res data,", res.data);
      notification.success({
        message: "Update user",
        description: `Update user successfully`,
      });
      resetAndCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Create user",
        description: JSON.stringify(res.message) || "create user failed",
      });
    }
  };
  return (
    <Modal
      title="Update User"
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => setIsModalUpdateOpen(false)}
      okText={"Update"}
    >
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
        <div>
          <span>ID</span>
          <Input value={id} disabled />
        </div>
        <div>
          <span>Full Name</span>
          <Input
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </div>

        <div>
          <span>Phone number</span>
          <Input
            maxLength={10}
            required
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
