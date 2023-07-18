import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

// FB 인증 Context 를 생성함
// Store(은행금고)
const AuthContext = createContext();

// context 관리 리듀서 함수
// action을 처리하는 reducer 함수
// reducer 함수 형태로 action(요청서)을 처리하는 이유
// 원본(state)을 훼손하지 않고 원하는 데이터 처리 후
// 원본(state)를 변경한다. (불변성 유지)
const authReducer = (state, action) => {
  console.log("리듀서 함수: ", action);

  // action은 반드시 형태가 {type:"구분자"}
  // {type:"입금", payload:1000}
  // {type:"출금", payload:1000}
  // {type:"잔고"}
  // context = 금고 dispatch = 요청, action = 요청서의 내용

  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      // {
      //   user : null
      //   isAuthReady : true
      // }
      return { ...state, user: action.payload, isAuthReady: true };
      // {
      //   user : {email:"f@f.net", displayName:"프론트", uid:"asd"}
      //   isAuthReady : true
      // }
      default:
      return state;
  }
};

// Context 를 구독(Subscribe) 하도록  Provider 를 생성
const AuthContextProvider = ({ children }) => {
  // 유저 정보를 관리할 함수(Reducer)를 생성

  // 각각의 컴포넌트 상태 관리를 위한 Hook
  // const [상태, 상태관리(수정)함수] = useState(초기값);
  // const [age, setAge] = useState(0);

  // Context 에 담겨진 전역 상태 관리를 위한 Hook
  // const [전역상태, 전역상태관리함수] = useReducer(함수, 초기값);
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // fb 로그인 정보 {email:"", uid:"", nickName:""}
    isAuthReady: false, // 로그인상태 체크
  });
  // FB 인증 웹 브라우저 새로 고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      // if (user) {
      //   // User is signed in, see docs for a list of available properties
      //   // https://firebase.google.com/docs/reference/js/auth.user
      //   const uid = user.uid;
      //   // ...
      // } else {
      //   // User is signed out
      //   // ...
      // }
      // 로그인이 되었는지 아닌지를 파악한다.
      // AuthContext에 User 정보를 입력한다.
      console.log("onAuthStateChanged : ", user);
      dispatch({ type: "isAuthReady", payload: user });
    });
  }, []);
  return (
    // Context 내부의 컴포넌트들에게 상태 정보를 공급하겠다.
    // value는 default로 쓴다.
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
