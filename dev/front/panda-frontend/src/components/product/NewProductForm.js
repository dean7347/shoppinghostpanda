import FileUpload from "../common/FileUpload";
import { Typography, Form, Input, Button } from "antd";
import React, { useState, useRef, useCallback } from "react";
import axios from "../../../node_modules/axios/index";
import OptionTemplate from "../common/List/OptionTemplate";
import TodoInsert from "../common/List/TodoInsert";
import TodoList from "../common/List/TodoList";

const Continents = [
  { key: 1, value: "afr" },
  { key: 2, value: "europe" },
  { key: 3, value: "korea" },
  { key: 4, value: "amoln" },
  { key: 5, value: "europe" },
];

const { Titled } = Typography;
const { TextArea } = Input;

function NewProductForm() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);
  const [Thumb, setThumb] = useState([]);

  const [Options, setOptions] = useState([]);
  //고유값으로 사용될 id ref사용하여 번수담기
  const nextId = useRef(1);

  const onInsert = useCallback(
    (optionName, optionPrice, optionStock) => {
      const Option = {
        id: nextId.current,
        optionName,
        optionPrice,
        optionStock,
      };
      setOptions(Options.concat(Option));
      nextId.current += 1;
    },
    [Options]
  );

  const onRemove = useCallback(
    (id) => {
      setOptions(Options.filter((Option) => Option.id !== id));
    },
    [Options]
  );

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const updateThumb = (newThumb) => {
    setThumb(newThumb);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("등록시작");

    if (!Title || !Description || !Images || !Options || !Thumb) {
      return alert("모든 값을 넣어주셔야 합니다");
    }

    //서버에 채운 값들 request로 보낸다
    const body = {
      //로그인 된 사람의 ID
      title: Title,
      description: Description,
      images: Images,
      options: Options,
      thumb: Thumb,
    };
    axios.post("/regnewproduct", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다");
      } else {
        alert("상품업로드에 실패 했습니다.");
      }
    });
  };
  return (
    <>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2> 상품 업로드</h2>
        </div>
        <Form onSubmit={submitHandler}>
          <label>썸네일</label>
          <FileUpload refreshFunction={updateThumb} />
          <label>상품설명</label>
          <FileUpload refreshFunction={updateImages} />

          <br />
          <br />
          <label>이름</label>
          <Input onChange={titleChangeHandler} value={Title} />
          <br />
          <br />
          <label>설명</label>
          <TextArea onChange={descriptionChangeHandler} value={Description} />
          <br />
          <br />
        </Form>
        {/* <label> 옵션</label> */}
        <OptionTemplate>
          <TodoInsert onInsert={onInsert} />
          <TodoList Options={Options} onRemove={onRemove} />
        </OptionTemplate>

        <button onClick={submitHandler}>상품등록하기</button>
      </div>
    </>
  );
}
export default NewProductForm;

/**
 *                 createProductDAO.Image,
                createProductDAO.productName,
                createProductDAO.productPrice,
                createProductDAO.productOptions,
                createProductDAO.productDesc
 */
