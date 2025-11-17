import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

const UserForm = () => {
  const [fullName, setFullName] = useState("An Đức Anh");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitBtn = async () => {
    const res = await createUserApi(fullName, email, password, phoneNumber);
    if (res.data) {
      notification.success({
        message: "Create user",
        description: `create user "${res.data.fullName}" successfully`,
      });
      setIsModalOpen(false);
    } else {
      notification.error({
        message: "Create user",
        description: JSON.stringify(res.message) || "create user failed",
      });
    }
  };
  return (
    <div
      className="user-form"
      style={{
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table users</h3>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create user
          </Button>
        </div>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => {
          handleSubmitBtn();
        }}
        onCancel={() => setIsModalOpen(false)}
        okText={"Create"}
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
    </div>
  );
};
export default UserForm;
