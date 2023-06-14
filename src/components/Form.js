import React, { useState } from "react";

const Form = ({ todoData, setTododata }) => {
  console.log("Form 랜더링");

  // 새로운 할일 state 변수
  const [value, setValue] = useState("");

  // input type="text" 의 value 변경 화면 리랜더링
  const handleChange = e => {
    setValue(e.target.value);
  };

  //  form submit 체크
  const handleSubmit = e => {
    // 웹 브라우저로 url데이터 전송을 막아야함.
    // A태그의 href를 막아주듯
    e.preventDefault();

    // 형식 즉, 키명을 구조를 지켜줌.
    const newTodo = { id: Date.now(), title: value, completed: false };
    // 새로운 todo 객체를 만들어준다 그리고 저장하고 갱신한다.
    // todoData 에 추가
    setTododata([...todoData, newTodo]);
    // 입력창 초기화
    setValue("");
  };

  return (
    <div>
      <form
        className="flex pt-2"
        style={{ display: "flex" }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="value"
          style={{ flex: "10", padding: "5px" }}
          placeholder="할 일을 입력 해주세요"
          value={value}
          onChange={handleChange}
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        ></input>
        <input
          type="submit"
          style={{ flex: "1" }}
          value="입력"
          className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
        ></input>
      </form>
    </div>
  );
};

export default Form;
