import React from "react";

const ListItem = ({ item, todoData, setTododata }) => {
  console.log("ListItem 랜더링", item);

  const btnStyle = {
    color: "#fff",
    float: "right",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const getStyle = _completed => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: _completed ? "line-through" : "none",
    };
  };

  // 이벤트 핸들러
  const handleClick = _id => {
    // 전달된 ID를 검색해서 목록에서 제거
    // 1. 전달된 id로 해당하는 목록 찾아서 제외
    // 2. 새로운 목록으로 갱신해서 화면 리랜더링
    // 3. 배열의 고차함수 중 filter를 사용
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTododata(newTodoData);
  };

  const handleCompleteChange = _id => {
    // 중요한것은 id에 해당하는 것만 수정하면 되지 <--XXXXXXX아님
    // state는 항상 새롭게 만든 내용 즉, 배열로 업데이트 해야 한다.
    // 새로운 배열을 만들어서 set 하자.
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        // completed를 갱신함.
        item.completed = !item.completed;
      }
      return item;
    });
    setTododata(newTodoData);
  };
  return (
    <div style={getStyle(item.completed)} key={item.id}>
      {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
      <input
        type="checkbox"
        defaultChecked={item.completed}
        onChange={() => handleCompleteChange(item.id)}
      />
      {item.title}
      <button style={btnStyle} onClick={() => handleClick(item.id)}>
        X
      </button>
    </div>
  );
};

export default React.memo(ListItem);
