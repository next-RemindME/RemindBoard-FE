import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signAPI } from "../api/api";

interface SForm {
  email: string;
  nickname: string;
  password: string;
}
export default function Sign() {
  const [user, setUser] = useState<SForm>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value } as SForm);
  };

  const handleSubmit = async () => {
    const formData = {
      email: user?.email,
      nickname: user?.nickname,
      password: user?.password,
    };
    await signAPI.goSignIn(formData);
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
            name="useremail"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              name="email"
              onChange={handleChange}
              value={user?.email || ""}
              placeholder="아이디는 {abcd@abcd.abc}의 규칙으로 적어주세요"
            />
          </Form.Item>

          <Form.Item
            label="별명"
            name="username"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              name="nickname"
              onChange={handleChange}
              value={user?.nickname || ""}
              placeholder="별명을 적어주세요"
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
              placeholder="비밀번호는 7자리 이상으로 적어주세요"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit}
              style={{ width: "100%" }}
            >
              Sign in
            </Button>

            <Link to="/">
              <span style={{ color: "gray", cursor: "pointer" }}>
                /아이디가 있다면? 로그인 페이지로/
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
