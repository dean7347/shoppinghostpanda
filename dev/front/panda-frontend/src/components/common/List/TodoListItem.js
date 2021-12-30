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
      <div className="boxpro">
        <div className="boxNamepro">{optionName}</div>
        <div className="boxPricepro">{optionPrice}</div>
        <div className="boxStockpro">{optionStock}</div>
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;
