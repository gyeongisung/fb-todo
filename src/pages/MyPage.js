import React, { useEffect, useState } from "react";
import { MyPageDiv } from "../style/UserCSS";
import { useNavigate } from "react-router-dom";
import {
  useUpdateNickName,
  useUpdateEmail,
  useUpdatePass,
  useUserDelete,
} from "../hooks/useFirebase";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { displayName, email } = useSelector(state => state.fbAuth);
  const { updateNickName } = useUpdateNickName();
  const { updateMail } = useUpdateEmail();
  const { updatePass } = useUpdatePass();
  const { userDelete } = useUserDelete();
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  // AuthContext에 state의 user를 출력
  useEffect(() => {
    setNickName(displayName);
    setUserEmail(email);
  }, []);

  const handlerNickName = async e => {
    e.preventDefault();
    updateNickName(nickName);
  };
  const handlerEmail = async e => {
    e.preventDefault();
    updateMail(userEmail);
  };
  const handlerPassword = async e => {
    e.preventDefault();
    updatePass(pw);
  };
  const handlerDelete = async e => {
    e.preventDefault();
    userDelete();
    navigate("/");
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>마이페이지</h2>
      {/* 
        1. emotion 을 활용하여 tag 의 용도를 구분한다. 
        2. css 도 함께 적용한다.
      */}
      <MyPageDiv>
        <form>
          <div>
            <label htmlFor="">닉네임</label>
            <input
              type="text"
              required
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              maxLength={10}
              minLength={2}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerNickName}
            >
              닉네임 변경
            </button>
          </div>
          <div>
            <label htmlFor="">이메일</label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerEmail}
            >
              이메일 변경
            </button>
          </div>

          <div>
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              minLength={8}
              maxLength={16}
            />
            <label htmlFor="">비밀번호 확인</label>
            <input
              type="password"
              value={pwConfirm}
              onChange={e => setPwConfirm(e.target.value)}
              required
              minLength={8}
              maxLength={16}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerPassword}
            >
              비밀번호 변경
            </button>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerDelete}
            >
              회원탈퇴
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
      </MyPageDiv>
    </div>
  );
};

export default MyPage;
