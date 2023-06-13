import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  // 더미 데이터 일반변수
  const [todoData, setTododata] = useState([
    { id: 1, title: "할일 1", completed: false },
    { id: 2, title: "할일 2", completed: false },
    { id: 3, title: "할일 3", completed: false },
    { id: 4, title: "할일 4", completed: false },
  ]);

  return (
    <>
      <div className="container">
        <div className="todo-block">
          <div className="title">
            <h1>할일 목록</h1>
          </div>
          {/* 할일 목록 */}
          <List todoData={todoData} setTododata={setTododata} />
          {/* 할일 추가 */}
          <Form todoData={todoData} setTododata={setTododata} />
        </div>
      </div>
    </>
  );
}

export default App;
