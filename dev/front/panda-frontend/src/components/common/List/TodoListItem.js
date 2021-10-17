import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import "./TodoListItem.scss";
import cn from "classnames";

const TodoListItem = ({ Option, onRemove }) => {
  const { id, optionName, optionPrice, optionStock } = Option;
  return (
    <div className="TodoListItem">
      <div className="box">
        <div className="boxName">{optionName}</div>
        <div className="boxPrice">{optionPrice}</div>
        <div className="boxStock">{optionStock}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
