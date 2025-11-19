import { Button, Form, Input, Space } from "antd";

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    alert("Success:", values.fullName, values.email);
  };
  const onReset = () => {
    form.resetFields();
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
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone"
          // rules={[{ required: true, message: "Please input your username!" }]}
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
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default RegisterPage;
