import React, { useState } from "react";
import SignUpDiv from "../style/UserCSS";
import { useNavigate } from "react-router-dom";
// firebase 연동
import firebase from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const handleSignUp = async e => {
    e.preventDefault();
    try {
      // firebase 에 회원가입 하기
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pw);
      await createUser.user.updateProfile({
        name: nickName,
      });
      console.log("등록된 정보 : ", createUser.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white flex flex-col">
      <h2>회원가입</h2>
      {/* 
       1.emotion을 활용하여 tag의 용도를 구분한다.
       2.css도 함께 적용한다. 
       */}
      <SignUpDiv>
        <form className="shadow bg-white rounded">
          <label htmlFor="">닉네임</label>
          <input
            type="text"
            required
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            placeholder="이름을 입력해주세요"
            title="이름을 입력하지않으면 안되지?!"
          ></input>
          <label htmlFor="">이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
          ></input>
          <label htmlFor="">비밀번호</label>
          <input
            type="password"
            required
            minLength={8}
            maxLength={16}
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          ></input>
          <label htmlFor="">비밀번호 확인</label>
          <input
            type="password"
            required
            value={pwConfirm}
            onChange={e => setPwConfirm(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          ></input>
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => handleSignUp(e)}
            >
              회원가입
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </SignUpDiv>
    </div>
  );
};

export default Signup;
