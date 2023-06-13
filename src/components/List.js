import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTododata }) => {
  return (
    <div>
      {/* 할일 목록 */}
      {todoData.map(item => (
        // key는 반복문에서 unique 해야한다.
        <ListItem
          key={item.id}
          item={item}
          todoData={todoData}
          setTododata={setTododata}
        />
      ))}
    </div>
  );
};

export default List;
