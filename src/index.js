import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
// Provider는 Store의 state에 접근 가능 한 영역을 지정
import { Provider } from "react-redux";

// 1. Redux Store에서 관리 할 초기 객체
const initialState = {
  user: null, //사용자 정보
  isAuthReady: false, // 로그인상태 체크
  errMessage: "", //에러 메시지
};
// 2. Reducer 함수 만들기
// dispatch에 의해 전달 된 action을 이용하여 State를 업데이트
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };
    case "updateName":
      return { ...state, user: action.payload };
    case "updateMail":
      return { ...state, user: action.payload };
    case "deleteUser":
      return { ...state, user: null };
    case "isError":
      return { ...state, errMessage: action.payload };
    default:
      return state;
  }
};
// 3. Store 만들기
// 저장소 = createStore(reducer 함수, state 초기값)
const store = createStore(authReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Store의 State를 사용할 범위 지정
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
