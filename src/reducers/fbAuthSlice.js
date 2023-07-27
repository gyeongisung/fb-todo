import { createSlice } from "@reduxjs/toolkit";

// Slice 초기값
const initialState = {
  uid: null,
  displayName: null,
  email: null,
  isAuthReady: false, // 로그인상태 체크
  errMessage: "", //에러 메시지
};
// Slice 생성
const fbAuthSlice = createSlice({
  name: "fbAuthSlice",
  initialState,
  // 액션 크리에이터 함수 모음
  // 상태를 즉시 업데이트 (동기 코드)
  reducers: {
    loginFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    logoutFB: state => {
      // state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isAuthReadyFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload && action.payload.displayName;
      state.uid = action.payload && action.payload.uid;
      state.email = action.payload && action.payload.email;
      state.isAuthReady = true;
    },
    updateNameFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
    },
    updateMailFB: (state, action) => {
      // state.user = action.payload;
      state.email = action.payload.email;
    },
    deleteUserFB: state => {
      state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isErrorFB: (state, action) => {
      state.errMessage = action.payload;
    },
  },
});

// store에 포함하기 위한 export
export default fbAuthSlice;
// dispatch 활용을 위한 export
export const {
  loginFB,
  logoutFB,
  isAuthReadyFB,
  updateNameFB,
  updateMailFB,
  deleteUserFB,
  isErrorFB,
} = fbAuthSlice.actions;
