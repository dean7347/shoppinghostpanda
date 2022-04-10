import FileEdit from "../common/FileEdit";
import { Typography, Form, Input, Button, Select, Space } from "antd";
import React, { useState, useRef, useCallback, useEffect } from "react";
import OptionTemplate from "../common/List/OptionTemplate";
import TodoInsert from "../common/List/TodoInsert";
import TodoList from "../common/List/EditTodoList";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../../api/axiosDefaults";

const { Titled } = Typography;
const { TextArea } = Input;

function EditProductForm(props) {
  const [getThumbs, setGetThumbs] = useState([]);
  const [getDetail, setGetDetail] = useState([]);
  const areas = [
    { label: "Beijing", value: "Beijing" },
    { label: "Shanghai", value: "Shanghai" },
  ];
  const { Option, OptGroup } = Select;
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);
  const [Thumb, setThumb] = useState([]);
  const [Low, setLow] = useState("");
  const [Options, setOptions] = useState([]);
  const [lowdata, setLowData] = useState([]);
  const [pandaDescription, setPandaDescription] = useState("");
  const [Notice, setNotice] = useState([]);
  const [NoticeValue, setNoticeValue] = useState([]);
  const [noticeInitiateValue, setNoticeInitiateValue] = useState([]);
  const onFinish = (values) => {
    //console.log(values);
    let first = [];
    let last = [];
    values.notice.map((it, idx) => {
      first.push(it.first);
      last.push(it.last);
    });
    const body = {
      notice: first,
      noticeValue: last,
      type: Low,
      productId: props.productId,
    };

    axios.post("/api/editlaw", body).then((response) => {
      if (response.data.success) {
        alert("상품정보 수정에 성공했습니다");
      } else {
        alert("상품정보 수정에 실패 했습니다.");
      }
    });
  };
  const [form, setForm] = useState({
    //의류
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
    h: "",
    i: "",
    j: "",
    k: "",
    l: "",
    m: "",
    n: "",
    o: "",
  });
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${props.productId}`)
      .then((response) => {
        if (response.data.success) {
          // setProduct(response.data);

          //console.log(response.data);
          setTitle(response.data.productName);
          setDescription(response.data.productDesc);
          setPandaDescription(response.data.pandaMessage);
          setLow(response.data.type);
          // setPrice("프라이스");
          // setContinent("컨티넌트");
          handleChange(response.data.type);
          setLowData(JSON.parse(response.data.lowform));
          response.data.poptions.map((op, idx) => {
            const Option = {
              id: nextId.current,
              optionId: op.optionId,
              optionName: op.optionName,
              optionPrice: op.optionPrice,
              optionStock: op.optionStock,
            };
            Options.push(Option);
            nextId.current += 1;
          });
          setGetThumbs(response.data.thumbs);
          setGetDetail(response.data.detailImages);
          setNotice(response.data.notice);
          setNoticeValue(response.data.noticeV);
          response.data.notice.map((it, idx) => {
            const body = {
              first: it,
              last: response.data.noticeV[idx],
            };
            setNoticeInitiateValue(
              ...noticeInitiateValue,
              noticeInitiateValue.push(body)
            );
          });

          //console.log("노티스밸류", noticeInitiateValue);
        } else {
          alert("상세정보 가져오기를 실패했습니다");
        }
      });
  }, []);

  const onChangeLow = (e) => {
    // const nextForm = {
    //   ...form,
    //   [e.target.name]: e.target.value,
    // };
    // setForm(nextForm);
    const nextLaw = {
      ...lowdata,
      [e.target.name]: e.target.value,
    };
    setLowData(nextLaw);
  };
  const onClickForm = async (e) => {
    const tostringform = JSON.stringify(lowdata);

    // //console.log(lowdata);
    // //console.log(Low);

    const body = {
      lowform: tostringform,
      type: Low,
      productId: props.productId,
    };

    axios.post("/api/editlaw", body).then((response) => {
      if (response.data.success) {
        alert("상품정보 수정에 성공했습니다");
      } else {
        alert("상품정보 수정에 실패 했습니다.");
      }
    });
  };

  //고유값으로 사용될 id ref사용하여 번수담기
  const nextId = useRef(1);
  function handleChange(value) {
    // // //console.log(`selected ${value}`);
    setLow(value);
  }
  const onInsert = useCallback(
    (optionName, optionPrice, optionStock) => {
      const Option = {
        id: nextId.current,
        optionName,
        optionPrice,
        optionStock,
      };
      if (optionStock <= 0 || optionStock >= 3000) {
        alert("재고는 0 ~ 3000까지 가능합니다");
        return;
      }

      const body = {
        productId: props.productId,
        optionName: optionName,
        optionCount: optionStock,
        optionPrice: optionPrice,
      };
      axios.post("/api/addoption", body).then((response) => {
        if (response.data.success) {
          alert("옵션수정에 성공했습니다");
        } else {
          alert("상품업로드에 실패 했습니다.");
        }
      });

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
  const PandadescriptionChangeHandler = (event) => {
    setPandaDescription(event.currentTarget.value);
  };
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
    // //console.log(event);
    // // //console.log("등록시작");

    // if (!Title || !Description || !Images || !Options || !Thumb) {
    //   return alert("모든 값을 넣어주셔야 합니다");
    // }

    // //서버에 채운 값들 request로 보낸다
    // const body = {
    //   //로그인 된 사람의 ID
    //   title: Title,
    //   description: Description,
    //   images: Images,
    //   options: Options,
    //   thumb: Thumb,
    // };
    // axios.post("/regnewproduct", body).then((response) => {
    //   if (response.data.success) {
    //     alert("상품 업로드에 성공했습니다");
    //     history.push("/");
    //   } else {
    //     alert("상품업로드에 실패 했습니다.");
    //   }
    // });
  };
  const onClickEdit = (param, type) => {
    const body = {
      param: param,
      type: type,
      proId: props.productId,
    };
    axios.post("/api/edittextproduct", body).then((response) => {
      if (response.data.success) {
        alert("수정되었습니다");
      } else {
        alert("수정에 실패했습니다.");
      }
    });
  };

  // const conRere = () => {
  //   //console.log("zz");
  //   setLow(Low + 1);
  //   //console.log(Low);
  // };
  // const onclicktest = () => {
  //   //console.log("zz");
  //   //console.log(form);
  // };

  const renderOption = (param, form) => {
    return (
      <>
        <Select
          defaultValue={Low.toString()}
          style={{ width: 200 }}
          onChange={handleChange}
        >
          <OptGroup label="분류">
            <Option value="1">의류</Option>
            <Option key="2" value="2">
              구두 / 신발
            </Option>
            <Option value="3">가방</Option>
            <Option value="4">패션 잡화 (모자 / 벨트 / 액세서리)</Option>
            <Option value="5">침구류 / 커튼</Option>
            <Option value="6">가구(침대 / 소파 / 싱크대 / DIY제품)</Option>
            <Option value="7">영상가전(TV류)</Option>
            <Option value="8">
              가정용 전기제품(냉장고 / 세탁기 /식기세척기 / 전자레인지)
            </Option>
            <Option value="9">계절가전(에어컨 /온풍기)</Option>
            <Option value="10">사무용기기(컴퓨터 / 노트북 / 프린터)</Option>
            <Option value="11">광학기기(디지털카메라 / 캠코더)</Option>
            <Option value="12">소형전자(MP3 / 전자사전 등)</Option>
            <Option value="13">휴대폰</Option>
            <Option value="14">내비게이션</Option>
            <Option value="15">자동차용품(자동차부품/기타 자동차용품)</Option>
            <Option value="16">의료기기</Option>
            <Option value="17">주방용품</Option>
            <Option value="18">화장품</Option>
            <Option value="19">귀금속/보석/시계류</Option>
            <Option value="20">식품(농수축산물)</Option>
            <Option value="21">가공식품</Option>
            <Option value="22">건강기능식품</Option>
            <Option value="23">영유아용품</Option>
            <Option value="24">악기</Option>
            <Option value="25">스포츠용품</Option>
            <Option value="26">서적</Option>
            <Option value="27">호텔 /펜션 예약</Option>
            <Option value="28">여행패키지</Option>
            <Option value="29">항공권</Option>
            <Option value="30">자동차 대여 서비스(렌터카)</Option>
            <Option value="31">
              물품대여 서비스 (정수기,비데,공기청정기 등 )
            </Option>
            <Option value="32">
              물품대여 서비스 (서적, 유야용품,행사용품 등)
            </Option>
            <Option value="33">디지털 콘텐츠(음원, 게임, 인터넷강의 등</Option>
            <Option value="34">상품권 / 쿠폰</Option>
            <Option value="35">모바일 쿠폰</Option>
            <Option value="36">영화 공연</Option>
            <Option value="37">생활화학제품</Option>
            <Option value="38">살생물제품</Option>
            <Option value="39">기타 용역</Option>
            <Option value="40">기타 재화</Option>
          </OptGroup>
        </Select>
        <br />
        <br />
        {/* {lowdata.b !== "undefine" ? lowOption(Low.toString()) : "로딩중"} */}
        {/* <button onClick={submitHandler}>상품등록하기</button> */}
      </>
    );
  };
  const onFinishEdit = () => {
    window.location.replace("/shop");
  };
  return (
    <>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2> 상품 수정</h2>
          <h4>(*상품수정은 즉시 적용됩니다)</h4>
        </div>
        <Form onSubmit={submitHandler}>
          <label>
            썸네일(640 * 640 이하, 가로세로 크기가 같아야합니다)
            <br />
            jpg/png 파일만 허용됩니다
          </label>
          <FileEdit
            refreshFunction={updateThumb}
            type={"thumb"}
            proId={props.productId}
            imgarray={getThumbs}
          />
          <label>
            상품상세사진 (가로사이즈 860 이하)
            <br />
            jpg/png 파일만 허용됩니다.
          </label>
          <FileEdit
            refreshFunction={updateImages}
            type={"detail"}
            proId={props.productId}
            imgarray={getDetail}
          />

          <br />
          <br />
          <label>상품 이름</label>
          <Input onChange={titleChangeHandler} value={Title} />
          <div style={{ float: "right" }}>
            <Button onClick={() => onClickEdit(Title, "name")}>
              상품이름 수정
            </Button>
          </div>
          <br />
          <br />
          <label>설명</label>
          <TextArea onChange={descriptionChangeHandler} value={Description} />
          <div style={{ float: "right" }}>
            <Button onClick={() => onClickEdit(Description, "desc")}>
              설명 수정
            </Button>
          </div>
          <br />
          <br />
          <label>판다에게 상품을 홍보시 주의사항/요청사항을 입력해주세요</label>
          <TextArea
            onChange={PandadescriptionChangeHandler}
            value={pandaDescription}
          />
          <div style={{ float: "right" }}>
            <Button
              onClick={() => onClickEdit(pandaDescription, "pandaMessage")}
            >
              판다메시지 수정
            </Button>
          </div>

          <br />
          <br />
        </Form>
        {/* <label> 옵션</label> */}
        <OptionTemplate>
          <TodoInsert onInsert={onInsert} />
          <TodoList Options={Options} onRemove={onRemove} />
        </OptionTemplate>
        *https://www.law.go.kr/행정규칙/전자상거래등에서의상품등의정보제공에관한고시
        <br />를 따르며 사이트의 정책여건상 단축표기될 수 있습니다
        <br /> 모든 사항은 위 고시에 따르며 해당 내용 미표기,미흡에 대한 책임은
        <br />
        쇼핑호스트 판다에서 지지않습니다.
        <br />
        관련 필수 표기,법규를 꼭 참고해주시기 바랍니다
        <br />
        {/* {lowdata.a && Low && renderOption(Low)} */}
        {Low && renderOption(Low)}
      </div>

      <div
        style={{
          textAlign: "center",

          marginBottom: "2rem",
        }}
      >
        <Form
          name="dynamic_form_nest_item"
          style={{ display: "inline-block" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List in name="notice" initialValue={noticeInitiateValue}>
            {(fields, { add, remove }) => (
              <>
                {/* {//console.log()} */}
                {/* <Form.Item
                  name="notice"
                  label="Area"
                  rules={[{ required: true, message: "Missing area" }]}
                >
                  <Select options={areas} onChange={handleChange} />
                </Form.Item> */}

                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "first"]}
                      rules={[
                        { required: true, message: "고시항목을 입력해주세요" },
                      ]}
                    >
                      <Input placeholder="고시 항목" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "last"]}
                      rules={[{ required: true, message: "값을 입력해주세요" }]}
                    >
                      <Input placeholder="값" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      상품정보 추가
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              고시수정하기
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Button block onClick={onFinishEdit}>
        변경모드 종료
      </Button>
    </>
  );
}
export default EditProductForm;

/**
 *                 createProductDAO.Image,
                createProductDAO.productName,
                createProductDAO.productPrice,
                createProductDAO.productOptions,
                createProductDAO.productDesc
 */

/**
                 *   const lowOption = (setOption) => {
    switch (setOption) {
      //의류
      case "1":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (의류)
              </h1>
              <Form.Item
                label="제품소재"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="세탁방법 및 취급시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>{" "}
              <Form.Item
                label="A/S책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      //구두/신발
      case "2":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (구두/신발)
              </h1>
              <Form.Item
                label="제품 주소재"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증 기준"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      //가방
      case "3":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (가방)
              </h1>
              <Form.Item
                label="종류"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소재"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "4":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (패션잡화(모자/벨트/액세서리))
              </h1>
              <Form.Item
                label="종류"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소재"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "5":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (침구류 / 커튼)
              </h1>
              <Form.Item
                label="제품소재"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="세탁방법 및 취급시 주의사항"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증 기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "6":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (가구(침대/소파/싱크대/DIY제품))
              </h1>
              <Form.Item
                label="품명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="구성품"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요소재"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="배송 설치비용"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="as책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "7":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (영상가전(TV류))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기(형태포함"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="화면사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="as책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "8":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (가정용 전기제품(냉장고 /세탁기 /식기세척기 /전자레인지))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비 효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="As책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "9":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (계절가전(에어컨/온풍기))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비 효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="냉난방면적"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="추가설치비용"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.l}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "10":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (사무용기기(컴퓨터 /노트북 /프린터))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비 효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기,무게"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "11":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (광학기기(디지털 카메라/ 캠코더))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기 무게"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "12":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (소형전자(MP3/전자사전 등))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기 무게"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요 사양"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "13":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (휴대폰)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기,무게"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이동통신사 가입조건"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이동통신사"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="가입절차"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자의 추가적인 부담사항"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.l}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="m"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.m}
              >
                <Input type={"text"} name="m" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "14":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (네비게이션)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기, 무게"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="맵 업데이트 비용 및 무상기간"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "15":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (자동차 용품 (자동차부품/기타 자동차용품))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="적용 차종"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품사용으로 인한 위험 및 유의사항"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="검사합격증 번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "16":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (의료기기)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="의료기기법상 허가신고번호"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압,소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품의 사용목적 및 사용방법"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "17":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (주방용품)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="구성품"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시 년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입식품안전관리특별법문구"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "18":
        return (
          <div>
            <Form
              labelCol={{
                span: 15,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (화장품)
              </h1>
              <Form.Item
                label="용량 또는 중량"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품 주요 사양"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용기한 또는 개봉후 사용기간"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조업자/책임판매업자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법에따라 기재표시해야하는 모든성분"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="기능성화장품의경우심사필유무"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용할 떄 주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "19":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (귀금속)
              </h1>
              <Form.Item
                label="소재/순도/밴드재질(시계의경우)"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중량"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="착용 시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="등급(귀금속,보석류)"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="기능 방수등(시계)"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="보증서 제공여부"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Form.Item
                label="AS책임자와 전화번호"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.l}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "20":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (식품 농축산물)
              </h1>
              <Form.Item
                label="품명 또는 명칭"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="단위별 용량,수량,크기"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="생산자"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="원산지"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월일"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="농/축/수산물 표시사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품구성"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="보관방법 또는 취급방법"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법률에 따른 주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담 관련 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "21":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (가공심품)
              </h1>
              <Form.Item
                label="제품명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="식품의 유형"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="생산자 및 소재지"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월일,유통기한,품질유지기한"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="단위별 용량,수량"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="원재료명및함량"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="영양성분"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유전자변형여부"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입심품인경우 문구"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "22":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (건강기능식품)
              </h1>
              <Form.Item
                label="제품명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="식품의 유형"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조업소의 명칭과 소재지"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월일,유통기한"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="단위별 용량,수량"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="원재료명및함량"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="영양정보"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="기능정보"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="섭취량,섭취방법,주의사항,부작용"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="의약품아님 표기"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유전자변형식품여부"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입식품 문구"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.l}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자안전을 위한 주의사항"
                name="m"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.m}
              >
                <Input type={"text"} name="m" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련 전화번호"
                name="n"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.n}
              >
                <Input type={"text"} name="n" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      case "23":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (영유아용품)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="특별법 상 KC인증 필유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기,중량"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용연령 또는체중범위"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급방법및주의사항,안전표시"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와전화번호"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.l}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "24":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (악기)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품별 세부사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질 보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "25":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (스포츠용품)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기, 중량"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품별세부사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "26":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (서적)
              </h1>
              <Form.Item
                label="도서명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="저자 출판사"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="쪽수"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="출간일"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="목차 또는책소개"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "27":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (호텔/펜션예약)
              </h1>
              <Form.Item
                label="국가 또는 지역명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="숙소형태"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="등급,객실타입"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용가능 인원 인원추가시 비용"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="부대시설제공서비스"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소규정"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약담당연락처"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "28":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (여행패키지)
              </h1>
              <Form.Item
                label="여행사"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용항공편"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="여행기간 및 일정"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="총 에정 인원,출발가능 인원"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="숙박정보"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="여행상품 가격"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="선택경비 유무"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="선택관광및대체일정"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="가이드팁"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소규정"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="여행경보단계"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약담당연락처"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.l}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "29":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (항공권)
              </h1>
              <Form.Item
                label="요금조건,왕복편도여부"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유효기간"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제한사항"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="티켓수령방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="좌석종류"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="가격미포함내역및금액"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소규정"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약담당연락처"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "30":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (자동차 대여서비스(렌터카))
              </h1>
              <Form.Item
                label="차종"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소유권이전조건(해당경우에한함)"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="추가선택시 비용"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="차량반환시연료대금정산방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="차량의고장훼손시 소비자책임"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약취소 또는 중도해약시 환불기준"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "31":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (물품대여 서비스)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소유권 이전조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유지보수 조건"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품고장,분실,훼손시소비자책임"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중도해약시환불기준"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품사양"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자 상담관련전화번호"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "32":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (물품대여서비스(서적,유아용품,행사용품)))
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소유권이전조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품의고장분실훼손시소비자책임"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중도해약시환불기준"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "33":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (디지털 콘텐츠(음원,게임,인터넷강의 등))
              </h1>
              <Form.Item
                label="제작자 또는 공급자"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용조건,이용기간"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품제공방식"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="최소시스템사양,필수소프트웨어"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="청약철회또는계약의해제해지에따른효과"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "34":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (상품권 쿠폰)
              </h1>
              <Form.Item
                label="발행자"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유효기간,이용조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용가능매장"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="잔액환급조건"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>

              <Form.Item
                label="소비자상담관련전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "35":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (모바일 쿠폰)
              </h1>
              <Form.Item
                label="발행자"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유효기간,이용조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용가능매장"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="환불조건 및 방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "36":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (영화 공연)
              </h1>
              <Form.Item
                label="주최 또는 기확(공연에한함)"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주연(공연에 한함)"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="관람등급"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상영,공연시간"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상영,공연장소"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예매취소조건"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소환불방법"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련 전화번호"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "37":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (생활화학제품)
              </h1>
              <Form.Item
                label="품명 및 제품명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="용도 및제형"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월 및 유통기한"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중량 용량 매수"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="효과 효능"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="어린이 보호포장대상 유무"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용된화학물질명칭"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용시 주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="신고번호/승인번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "38":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (살생물제품)
              </h1>
              <Form.Item
                label="제품명 및 제품유형"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중량또는용량,표준사용량"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="효과,효능"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용대상자 및사용범위"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="어린이보호포장대상유무"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="물질의명칭"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.g}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품 유해성 위해성표시"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.h}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용방법 및 사용상주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.i}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="승인번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.j}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.k}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "39":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (기타용역)
              </h1>
              <Form.Item
                label="서비스제공사업자"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법에의한 인허가사항"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용조건"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소중도해약해지조건,환불기준"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소환불방법"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련 전화번호"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.f}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;
      case "40":
        return (
          <div>
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onClickForm}
            >
              <h1>
                전자상거래 등에서의 상품 등의
                <br /> 정보제공에 관한 고시
                <br />
                (기타재화)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.a}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법에 의한 인허가사항"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.b}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국,원산지"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.c}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.d}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS,소비자상담 전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
                initialValue={lowdata.e}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <div style={{ display: "flex", float: "right" }}>
                <Button type="primary" htmlType="submit">
                  고시수정
                </Button>
              </div>
            </Form>
          </div>
        );
        break;

      default:
        return <div>품목명을확인해주세요</div>;
    }
  };

                 */
