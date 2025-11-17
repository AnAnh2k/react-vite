import { Button, Input } from "antd";
import { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [fullName, setFullName] = useState("An Đức Anh");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  console.log("Render UserForm:", { fullName, email, password, phoneNumber });

  const handleClickBtn = () => {
    const URL_BACKEND = "http://localhost:8080/api/v1/user";
    const data = {
      fullName,
      email,
      password,
      phone: phoneNumber,
    };
    axios.post(URL_BACKEND, data);
    alert(
      `Full Name: ${fullName}\nEmail: ${email}\nPassword: ${password}\nPhone Number: ${phoneNumber}`
    );
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
