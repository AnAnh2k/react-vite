import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserApi } from "../../services/api.service";

const UserForm = () => {
  const [fullName, setFullName] = useState("An Đức Anh");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClickBtn = async () => {
    const res = await createUserApi(fullName, email, password, phoneNumber);
    if (res.data) {
      notification.success({
        message: "Create user",
        description: `create user "${res.data.fullName}" successfully`,
      });
    }
    console.log("Create user response:", res.data);
  };
  return (
    <div
      className="user-form"
      style={{
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "600px",
      }}
    >
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
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
        <div>
          <Button
            type="primary"
            onClick={() => {
              handleClickBtn();
            }}
          >
            Create user
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
