import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  notification,
  Row,
  Space,
} from "antd";
import { loginUserApi } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await loginUserApi(values.email, values.password);
    //call api
    if (res.data) {
      message.success("Login user successfully");
      navigate("/");
    } else {
      notification.error({
        message: "Login user",
        description: JSON.stringify(res.message) || "Login user failed",
      });
    }
    setLoading(false);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <Col xs={24} md={16} lg={8}>
          <fieldset
            style={{
              padding: "15px",
              margin: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <legend>Đăng nhập</legend>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ margin: "30px" }}
              // onFinishFailed={onFinishFailed}
            >
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
              <Form.Item>
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      form.submit();
                    }}
                    loading={loading}
                  >
                    Login
                  </Button>
                  <Link to="/">
                    Go to homePage <ArrowRightOutlined />
                  </Link>
                </Space>
              </Form.Item>
            </Form>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
