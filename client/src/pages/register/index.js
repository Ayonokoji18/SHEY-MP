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

function Register() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-3 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          SMP - <span className="text-gray-400">REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="Email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="password" />
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
