import React, { useEffect } from "react";
import { useState } from "react";
import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { getTodo, deleteAllTodo } from "../axios/axios";
import Loading from "../components/Loading";
import { useAuthContext } from "../hooks/useFirebase";
import { useCollection } from "../hooks/useCollection";

// 사용자의 uid가 필요, 이유는 회원가입을 여러명이 할수 있는데,
// todo를 등록해 주기 위해서 uid 필요

const Todo = ({ fbName, fbEmail, fbUid }) => {
  // 사용자별 등록을 위해 user를 참조
  const { user } = useAuthContext();
  // Collection data 출력 state
  const { documents, error } = useCollection("todo", ["uid", "==", user.uid]);
  console.log("문서목록==============");
  console.log(documents);

  const navigator = useNavigate();
  // 로딩 처리
  const [isLoading, setIsLoading] = useState(true);

  // 백엔드반에서는 DB table 구성에 활용한다.
  // Firebase,MongoDB에서는 Collection 구성에 활용한다.
  console.log(fbName, fbEmail);
  // JsonServer 데이터 state 변수
  const [todoData, setTodoData] = useState([]);

  const handleRemoveClick = () => {
    setTodoData([]);
    // 로컬스토리지 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
    deleteAllTodo();
  };

  return (
    <div className="flex justify-center items-start mt-5 w-full">
      {/* {isLoading && <Loading />} */}
      <div className="w-4/5 p-6 bg-white rounded-[6px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl text-blue-600 font-semibold">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할일 목록 */}
        {error && <strong>{error}</strong>}
        {documents && <List todoData={documents} />}
        {/* <List todoData={todoData} setTodoData={setTodoData} /> */}
        {/* 할일 추가 */}
        <Form
          todoData={todoData}
          setTodoData={setTodoData}
          fbName={fbName}
          fbEmail={fbEmail}
          uid={user.uid}
        />
      </div>
    </div>
  );
};

export default Todo;
