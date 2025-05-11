import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Login() {
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-3 w-[450px] rounded">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400"> LOGIN</span>
        </h1>
        <Divider />
        <Form layout="vertical">
          <Form.Item label="Email" name="Email" rules={rules}>
            <Input placeholder="Email " />
          </Form.Item>
          <Form.Item label="Password" name="Password" rules={rules}>
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
