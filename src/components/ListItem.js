import React, { useEffect, useState } from "react";
import { useFireStore } from "../hooks/useFireStore";

const ListItem = ({ item }) => {
  // console.log("ListItem 랜더링", item);
  const { deleteDocument, updateCompletedDocument, updateTitleDocument } =
    useFireStore("todo");

  // 수정 상태 설정 state
  const [isEdit, setIsEdit] = useState(false);
  // 수정 상태 타이틀 설정 state
  const [editTitle, setEditTitle] = useState(item.title);

  const getStyle = _completed => {
    return {
      padding: "10px",
      textDecoration: _completed ? "line-through" : "none",
    };
  };

  // 이벤트 핸들러
  const handleDeleteClick = _id => {
    deleteDocument(_id);
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleEditChange = e => {
    setEditTitle(e.target.value);
  };
  const handleCancelClick = () => {
    setIsEdit(false);
  };
  const handleSaveClick = _id => {
    updateTitleDocument(_id, editTitle);
    setIsEdit(false);
  };

  const handleCompleteChange = _id => {
    // FB의 Firestore에서 id를 참조 전달
    // FB의 Firestore에서 completed를 반대로 !(Not 연산자)
    updateCompletedDocument(_id, !item.completed);

  };

  if (isEdit) {
    // 글 수정중
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center w-3/5">
          <input
            className="w-full px-3 py-2 mr-3 text-gray-500 rounded"
            type="text"
            defaultValue={item.title}

            onChange={e => handleEditChange(e)}
          />
        </div>
        <div className="items-center">
          <button className="px-4 py-2 float-right" onClick={handleCancelClick}>
            Cancle
          </button>
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleSaveClick(item.id)}
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    // 일반 상태
    return (
      <div className="flex items-center justify-between w-full mb-2 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
        <div className="items-center flex" style={getStyle(item.completed)}>
          {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            value={item.completed}
            onChange={() => handleCompleteChange(item.id)}
          />
          <span className="ml-3">{item.title}</span>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={() => handleDeleteClick(item.id)}
          >
            Delete
          </button>
          <button className="px-4 py-2 float-right" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    );
  }
};

// 리랜더링 최적화 적용
export default React.memo(ListItem);
