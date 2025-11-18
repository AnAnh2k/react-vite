import { useState } from "react";

import { Button, Input, Modal, notification } from "antd";
import { createUserApi } from "../../services/api.service";

const UpdateUserModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetAndCloseModal = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  const handleSubmitBtn = async () => {
    const res = await createUserApi(fullName, email, password, phoneNumber);
    if (res.data) {
      notification.success({
        message: "Create user",
        description: `create user "${res.data.fullName}" successfully`,
      });
      resetAndCloseModal();
      // await loadUser();
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
      open={isModalOpen}
      onOk={() => {
        handleSubmitBtn();
      }}
      onCancel={() => setIsModalOpen(false)}
      okText={"Update"}
    >
      <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
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
          <span>Email</span>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
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
