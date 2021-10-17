import React from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.scss";

const TodoList = ({ Options, onRemove }) => {
  return (
    <div className="TodoList">
      {Options.map((option) => (
        <TodoListItem Option={option} key={option.id} onRemove={onRemove} />
      ))}
    </div>
  );
};
export default TodoList;
