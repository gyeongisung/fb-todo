import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useLogin } from "../hooks/useLogin";
// import firebase from "../firebase";

const Login = () => {
  const { login } = useLogin();

  // Link, NavLink, useNavigate
  const navigate = useNavigate();

  const onFinish = values => {
    console.log("Success:", values);

    try {
      login(values.email, values.password);
    } catch (error) {
      console.log(error);
    }
    // try {
    //   await firebase
    //     .auth()
    //     .signInWithEmailAndPassword(values.email, values.password);
    //   // 사용자 정보 가지고 오기
    //   const user = firebase.auth().currentUser;
    //   setFBName(user.displayName);
    //   setFBEmail(user.email);
    //   setFBUid(user.uid);
    //   alert(`${user.displayName}님 반갑습니다.`);
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    //   if (error.code === "auth/invalid-email") {
    //     setModalMessage("올바른 이메일 형식이 아닙니다.");
    //   } else if (error.code === "auth/wrong-password") {
    //     setModalMessage("올바르지 않은 비밀번호입니다.");
    //   } else if (error.code === "auth/user-not-found") {
    //     setModalMessage("가입되지 않은 사용자 입니다.");
    //   } else if (error.code === "auth/missing-email") {
    //     setModalMessage("이메일이 입력되지 않았습니다.");
    //   } else {
    //     setModalMessage("로그인에 실패하였습니다.");
    //   }
    //   showModal();
    // }
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  // Modal 기능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 로그인
  const validatePassword = useCallback((_, password) => {
    if (!password) {
      return Promise.reject(new Error("비밀번호를 입력하세요."));
    } else if (password.length < 6) {
      return Promise.reject(new Error("비밀번호를 6자 이상 입력해주세요."));
    }
    return Promise.resolve();
  }, []);

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>로그인</h2>

      {/* AntD Modal */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalMessage}</p>
      </Modal>

      {/*  AntD form */}
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Email은 필수 항목입니다.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff" }}
          >
            로그인
          </Button>

          <Button
            type="primary"
            style={{ backgroundColor: "#1677ff", marginLeft: 10 }}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
