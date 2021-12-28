import React from "react";
import TodoListItem from "./EditTodoListItem";
import "./TodoList.scss";

const EditTodoList = ({ Options, onRemove, onInsert }) => {
  return (
    <div className="TodoList">
      {Options.map((option) => (
        <TodoListItem
          Option={option}
          key={option.id}
          onRemove={onRemove}
          onInsert={onInsert}
        />
      ))}
    </div>
  );
};
export default EditTodoList;
