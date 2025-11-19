import { Button, Form, Input, notification, Space } from "antd";
import { registerUserApi } from "../services/api.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await registerUserApi(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    //call api
    if (res.data) {
      notification.success({
        message: "Register user",
        description: `Register user successfully`,
      });
      navigate("/");
    } else {
      notification.error({
        message: "Register user",
        description: JSON.stringify(res.message) || "Register user failed",
      });
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      fullName: "An Đức Anh",
      email: "anducanh125@gmail.com",
      password: "123456",
      phone: "0999999999",
    });
  };
  const [form] = Form.useForm();

  return (
    <>
      <Form
        form={form}
        style={{
          margin: "50px auto",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
        }}
        layout="vertical"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              type: "email",
              message: "Email không đúng định dạng",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your username!" },
            {
              min: 6,
              message: "Mật khẩu tối thiểu 6 kí tự",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            {
              required: true,
              pattern: new RegExp(/\d+/g),
              message: "Wrong format!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button
              type="link"
              htmlType="button"
              onClick={() => {
                onFill();
              }}
            >
              Fill form
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default RegisterPage;
