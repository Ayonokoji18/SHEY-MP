import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Form Values", values);
    try {
      const response = await LoginUser(values);
      console.log("Login Api response", response);
      if (response.success) {
        console.log("About to Show success Message");
        messageApi.success(response.message);
        message.success(response.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      messageApi.error(error.message);
    }
  };
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      {contextHolder}
      <div className="bg-white p-3 w-[450px] rounded">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400"> LOGIN</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email " />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button block type="primary" htmlType="submit" className="mt-2">
            Login
          </Button>
          <div className="mt-3 text-center">
            <span className="text-gray-500">
              Create New account ?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
