import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signAPI } from "../api/api";
import { useRouter } from "../hooks/useRouter";

export type User = {
  email: string;
  name?: string;
  password: string;
};

export default function Login() {
  const [user, setUser] = useState<User>();
  const { routerTo } = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value } as User);
  };

  const handleSubmit = async () => {
    const formData = {
      email: user?.email,
      password: user?.password,
    };
    const logInRes = await signAPI.goLogIn(formData);
    localStorage.setItem("token", JSON.stringify(logInRes.data));
    if (logInRes.status === 200) routerTo("/remind");
  };

  return (
    <StForm>
      <div style={{ width: "100%" }}>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="아이디"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="email"
              onChange={handleChange}
              value={user?.email || ""}
            />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              name="password"
              onChange={handleChange}
              value={user?.password || ""}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Log in
            </Button>

            <Link to="/sign">
              <span style={{ color: "gray", cursor: "pointer" }}>
                /아이디가 없다면? 회원 가입 페이지로/
              </span>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </StForm>
  );
}

const StForm = styled.div`
  background-color: white;
  padding: 40px 20px;
  width: 60vw;
  margin: 30vh auto;
  border-radius: 7px;
`;
