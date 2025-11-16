import { Button, Input } from "antd";

const UserForm = () => {
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
          <Input />
        </div>
        <div>
          <span>Email</span>
          <Input />
        </div>
        <div>
          <span>Password</span>
          <Input.Password />
        </div>
        <div>
          <Button type="primary">Create user</Button>
        </div>
      </div>
    </div>
  );
};
export default UserForm;
