// FB ActionType 정의
export const FB_LOGIN = "fb/login";
export const FB_LOGOUT = "fb/logout";
export const FB_IS_AUTHREADY = "fb/isAuthReady";
export const FB_UPDATE_NAME = "fb/updateName";
export const FB_UPDATE_MAIL = "fb/updateMail";
export const FB_DELETE_USER = "fb/deleteUser";
export const FB_IS_ERROR = "fb/isError";
// FB Store State 초기값
export const initialState = {
  user: null, //사용자 정보
  isAuthReady: false, // 로그인상태 체크
  errMessage: "", //에러 메시지
};
// FB Reducer 정의
const authReducer = (state, action) => {
  switch (action.type) {
    case FB_LOGIN:
      return { ...state, user: action.payload };
    case FB_LOGOUT:
      return { ...state, user: null };
    case FB_IS_AUTHREADY:
      return { ...state, user: action.payload, isAuthReady: true };
    case FB_UPDATE_NAME:
      return { ...state, user: action.payload };
    case FB_UPDATE_MAIL:
      return { ...state, user: action.payload };
    case FB_DELETE_USER:
      return { ...state, user: null };
    case FB_IS_ERROR:
      return { ...state, errMessage: action.payload };
    default:
      return state;
  }
};
export default authReducer;
