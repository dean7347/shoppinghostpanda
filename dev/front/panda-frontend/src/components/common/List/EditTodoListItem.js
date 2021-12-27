import React from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import "./TodoListItem.scss";
import cn from "classnames";
import { Button } from "antd";
import axios from "../../../../node_modules/axios/index";

const onClickEdit = () => {
  console.log("수정");
};

const onClickdel = (e) => {
  if (
    window.confirm(
      "옵션항목에서 완전히 삭제되며 되돌릴 수 없습니다. 그래도 삭제하시곘습니까?"
    )
  ) {
    console.log(e);
    const body = {
      optionId: e,
    };
    console.log(body);

    axios.post("/api/editoption", body).then((response) => {
      if (response.data.success) {
        alert("선택된 옵션을 삭제했습니다");
        window.location.reload();
      } else {
        alert("옵션 삭제에 실패했습니다");
      }
    });
  } else {
    console.log("삭제취소");
  }
};
const EditTodoListItem = ({ Option, onRemove }) => {
  const { id, optionName, optionPrice, optionStock } = Option;
  console.log(Option);
  return (
    <div className="TodoListItem">
      <div className="box">
        <div className="boxName">{optionName}</div>
        <div className="boxPrice">{optionPrice}</div>
        <div className="boxStock">{optionStock}</div>
      </div>
      <Button type="primary" onClick={onClickEdit}>
        수정
      </Button>
      <Button type="primary" onClick={() => onClickdel(Option.optionId)} danger>
        삭제
      </Button>
    </div>
  );
};

export default EditTodoListItem;
