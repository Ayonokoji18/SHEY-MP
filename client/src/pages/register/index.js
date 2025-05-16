import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Form values", values);
    try {
      const response = await RegisterUser(values);
      console.log("Register API response:", response);
      if (response.success) {
        console.log("ABout to Show Success Message");
        messageApi.success(response.message);
        message.success(response.message);
        setTimeout(() => {
          navigate("/login");
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
      <div className="bg-white p-3 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="password" />
          </Form.Item>
          <Form.Item label="Confirm Password" name="cpassword" rules={rules}>
            <Input type="password" placeholder="confirm password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>

          <div className="mt-3 text-center">
            <span className="text-gray-500">
              Already have an accounts ?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
