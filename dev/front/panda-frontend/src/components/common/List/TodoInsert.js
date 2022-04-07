import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";
import axios from "../../../api/axiosDefaults";
const TodoInsert = ({ onInsert }) => {
  const [inputs, setInputs] = useState({
    optionName: "",
    optionPrice: "",
    optionStock: "",
  });

  const onSubmit = useCallback(() => {
    if (inputs.optionStock <= 0 || inputs.optionStock >= 3000) {
      alert("재고수량은 0~3000까지 가능합니다");
      return;
    }
    onInsert(inputs.optionName, inputs.optionPrice, inputs.optionStock);

    setInputs({ optionName: "", optionPrice: "", optionStock: "" });
  }, [onInsert, inputs]);

  const { optionName, optionPrice, optionStock } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <form className="TodoInsert" type="submit" onSubmit={onSubmit}>
        <input
          name="optionName"
          placeholder="옵션명을 입력하세요"
          value={optionName}
          onChange={onChange}
        />

        <input
          placeholder="가격"
          type="number"
          name="optionPrice"
          value={optionPrice}
          onChange={onChange}
        />

        <input
          placeholder="재고"
          type="number"
          name="optionStock"
          min={0}
          max={3000}
          value={optionStock}
          onChange={onChange}
          style={{ width: "10%" }}
        />
      </form>
      <button className="button" onClick={onSubmit}>
        옵션추가
      </button>
    </>
  );
};

export default TodoInsert;
