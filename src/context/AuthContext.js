import { createContext, useReducer } from "react";

// FB 인증 Context 를 생성함
// Context 생성 목적은 전역 상태정보 활용
// 중간중간 컴포넌트에 props 를 전달하지않고
// 상태정보 출력 및 수정
// 글로벌 변수
const AuthContext = createContext();

// context 관리 리듀서 함수
const authReducer = (state, action) => {
  console.log("리듀서 함수: ", action);
  switch (action.type) {
    case "login": // state 를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
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
  });

  return (
    // Context 내부의 컴포넌트들에게 상태 정보를 공급하겠다.
    // value는 default로 쓴다.
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
