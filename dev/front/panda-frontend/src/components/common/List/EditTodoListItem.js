import React, { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";
import "./TodoListItem.scss";
import cn from "classnames";
import { Button, Modal } from "antd";
import axios from "../../../api/axiosDefaults";
import TodoInsert from "./EditInsert";
const EditTodoListItem = ({ Option, onRemove }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setIsModalVisible(false);
    window.location.reload();
  };
  const { id, optionName, optionPrice, optionStock } = Option;

  const onClickEdit = () => {
    //console.log("수정");
    setIsModalVisible(true);
  };

  const onClickdel = (e) => {
    if (
      window.confirm(
        "옵션항목에서 완전히 삭제되며 되돌릴 수 없습니다. 그래도 삭제하시곘습니까?"
      )
    ) {
      //console.log(e);
      const body = {
        optionId: e,
      };
      //console.log(body);

      axios.post("/api/editoption", body).then((response) => {
        if (response.data.success) {
          onRemove(id);
          alert("선택된 옵션을 삭제했습니다");
          window.location.reload();
        } else {
          alert("옵션 삭제에 실패했습니다");
        }
      });
    } else {
      //console.log("삭제취소");
    }
  };
  return (
    <div className="TodoListItem">
      <div className="boxpro">
        <div className="boxNamepro">{optionName}</div>
        <div className="boxPricepro">{optionPrice}</div>
        <div className="boxStockpro">{optionStock}</div>
      </div>
      <Button type="primary" onClick={onClickEdit}>
        수정
      </Button>
      <Button type="primary" onClick={() => onClickdel(Option.optionId)} danger>
        삭제
      </Button>
      <Modal
        title="상품수정"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <TodoInsert editoption={Option} complete={handleCancel} />
      </Modal>
    </div>
  );
};

export default EditTodoListItem;
