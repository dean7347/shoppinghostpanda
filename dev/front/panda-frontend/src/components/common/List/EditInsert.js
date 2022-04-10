import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";
import axios from "../../../api/axiosDefaults";

const EditInsert = ({ onInsert, editoption, complete }) => {
  const [inputs, setInputs] = useState({
    optionName: editoption.optionName,
    optionPrice: editoption.optionPrice,
    optionStock: editoption.optionStock,
  });

  // const onSubmit = useCallback(() => {
  //   onInsert(inputs.optionName, inputs.optionPrice, inputs.optionStock);

  //   setInputs({ optionName: "", optionPrice: "", optionStock: "" });
  // }, [onInsert, inputs]);

  const { optionName, optionPrice, optionStock } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = () => {
    const body = {
      optionId: editoption.optionId,
      optionName: optionName,
      optionCount: optionStock,
      optionPrice: optionPrice,
    };

    if (optionStock <= 0 || optionStock >= 3000) {
      alert("재고는 0 ~ 3000까지 가능합니다");
      return;
    }
    axios.post("/api/editproductoption", body).then((response) => {
      if (response.data.success) {
        alert("옵션수정에 성공했습니다");
      } else {
        alert("상품업로드에 실패 했습니다.");
      }
      complete();
    });
    //console.log(editoption);
  };
  return (
    <>
      <div
        style={{
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          background: "#22b8cf",
          display: "flex",
          height: "2rem",
          fontsize: "1.5rem",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justityContent: "center",
        }}
      >
        <form className="TodoInsert" type="submit" onSubmit={onSubmit}>
          <div style={{ width: "60%", float: "left" }}>
            <div style={{ borderRadius: "1px solid", background: "#22b8cf" }}>
              상품이름
            </div>
            <input
              name="optionName"
              placeholder="옵션명을 입력하세요"
              value={optionName}
              onChange={onChange}
              min={0}
              max={3000}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: "20%", float: "left" }}>
            <div style={{ borderRadius: "1px solid", background: "#22b8cf" }}>
              가격
            </div>

            <input
              placeholder="가격"
              type="number"
              name="optionPrice"
              value={optionPrice}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: "20%", float: "left" }}>
            <div style={{ borderRadius: "1px solid", background: "#22b8cf" }}>
              재고
            </div>

            <input
              placeholder="재고"
              type="number"
              name="optionStock"
              value={optionStock}
              min={0}
              max={3000}
              onChange={onChange}
              style={{ width: "100%" }}
            />
          </div>
        </form>
      </div>

      <button className="button" onClick={onSubmit}>
        옵션수정
      </button>
    </>
  );
};

export default EditInsert;
