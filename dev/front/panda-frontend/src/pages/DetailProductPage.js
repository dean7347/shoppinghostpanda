import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderContainer from "../containers/common/HeaderContainer";
import Footer from "../components/common/Footer";
import { Form, Input, Button } from "antd";
import ProductImage from "../components/sections/ProductImage";
import ProductInfo from "../components/sections/ProductInfo";
import { Row, Col, Tabs, BackTop } from "antd";

import PandaView from "../components/common/PandaView";
function DetailProductPage(props) {
  const { TabPane } = Tabs;
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});
  const [DetailImage, setDetailImage] = useState([{}]);
  const [Pandas, SetPandas] = useState([{}]);
  const [sto, setSto] = useState({});

  useEffect(() => {
    axios.get(`/api/getpandas_by_id?id=${productId}`).then((response) => {
      if (response.data.success) {
        SetPandas(response.data.details);
        console.log("판다스정보");
        console.log(response.data.details);
      } else {
        console.log("판다스 정보를 가져오지 못했습니다");
      }
    });
  }, []);

  const renderProductLow = (
    <>
      <table>
        <tr>
          <td>ㅇㅇ</td>
        </tr>
      </table>
    </>
  );

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}`)
      .then((response) => {
        if (response.data.success) {
          console.log("디테일정보");
          console.log(response.data);

          setProduct(response.data);
          let temp = JSON.parse(response.data.lowform);
          setSto(temp);

          console.log(temp);
          setDetailImage(response.data.detailImages);
        } else {
          alert("상세정보 가져오기를 실패했습니다");
        }
      });
  }, []);

  const lowOption = (setOption) => {
    console.log(setOption);
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
              >
                <label>{sto.a}</label>
              </Form.Item>
              <Form.Item
                label="색상"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.b}</label>
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.c}</label>
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.d}</label>
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.e}</label>
              </Form.Item>
              <Form.Item
                label="세탁방법 및 취급시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.f}</label>
              </Form.Item>
              <Form.Item
                label="제조연월"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.g}</label>
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.h}</label>
              </Form.Item>{" "}
              <Form.Item
                label="A/S책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <label>{sto.i}</label>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input
                  type={"text"}
                  name="a"
                  onChange={onChangeLow}
                  placeholder="섬유의 조성 또는 혼용률을 백분율로표시,기능성인 경우 성적서 또는 허가서"
                />
              </Form.Item>
              <Form.Item
                label="색상"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input
                  type={"text"}
                  name="d"
                  placeholder="수입품의 경우 수입자를 함께표기"
                  onChange={onChangeLow}
                />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증 기준"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소재"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소재"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input
                  type={"text"}
                  name="a"
                  onChange={onChangeLow}
                  placeholder="충전재를 사용한 제품은 충전재 함께 표기"
                />
              </Form.Item>
              <Form.Item
                label="색상"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="세탁방법 및 취급시 주의사항"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증 기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="구성품"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요소재"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="배송 설치비용"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="as책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기(형태포함"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="화면사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="as책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비 효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="As책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비 효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="냉난방면적"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="추가설치비용"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="에너지소비 효율등급"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기,무게"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기 무게"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기 무게"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요 사양"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="A/S책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기,무게"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이동통신사 가입조건"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이동통신사"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="가입절차"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자의 추가적인 부담사항"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="m"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="m" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압, 소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기, 무게"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="맵 업데이트 비용 및 무상기간"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="KC 인증 필 유무"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="적용 차종"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품사용으로 인한 위험 및 유의사항"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="검사합격증 번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="의료기기법상 허가신고번호"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="정격전압,소비전력"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품의 사용목적 및 사용방법"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급시 주의사항"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="구성품"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시 년월"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입식품안전관리특별법문구"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품 주요 사양"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용기한 또는 개봉후 사용기간"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조업자/책임판매업자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법에따라 기재표시해야하는 모든성분"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="기능성화장품의경우심사필유무"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용할 떄 주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중량"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="치수"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="착용 시 주의사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주요사양"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="등급(귀금속,보석류)"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="기능 방수등(시계)"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="단위별 용량,수량,크기"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="생산자"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="원산지"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월일"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="농/축/수산물 표시사항"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품구성"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="보관방법 또는 취급방법"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법률에 따른 주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담 관련 전화번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="식품의 유형"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="생산자 및 소재지"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월일,유통기한,품질유지기한"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="단위별 용량,수량"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="원재료명및함량"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="영양성분"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유전자변형여부"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입심품인경우 문구"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="식품의 유형"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조업소의 명칭과 소재지"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월일,유통기한"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="단위별 용량,수량"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="원재료명및함량"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="영양정보"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="기능정보"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="섭취량섭치방법,주의사항,부작용"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="의약품아님 표기"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유전자변형식품여부"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입식품 문구"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자안전을 위한 주의사항"
                name="m"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="m" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련 전화번호"
                name="n"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="n" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="특별법 상 KC인증 필유무"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기,중량"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용연령 또는체중범위"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취급방법및주의사항,안전표시"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와전화번호"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품별 세부사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질 보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기, 중량"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="색상"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="동일모델의 출시년월"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품별세부사양"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="품질보증기준"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS책임자와 전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="저자 출판사"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="크기"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="쪽수"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품구성"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="출간일"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="목차 또는책소개"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="숙소형태"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="등급,객실타입"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용가능 인원 인원추가시 비용"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="부대시설제공서비스"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소규정"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약담당연락처"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용항공편"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="여행기간 및 일정"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="총 에정 인원,출발가능 인원"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="숙박정보"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="여행상품 가격"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="선택경비 유무"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="선택관광및대체일정"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="가이드팁"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소규정"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="여행경보단계"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약담당연락처"
                name="l"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="l" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유효기간"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제한사항"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="티켓수령방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="좌석종류"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="가격미포함내역및금액"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소규정"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약담당연락처"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소유권이전조건(해당경우에한함)"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="추가선택시 비용"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="차량반환시연료대금정산방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="차량의고장훼손시 소비자책임"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예약취소 또는 중도해약시 환불기준"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소유권 이전조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유지보수 조건"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품고장,분실,훼손시소비자책임"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중도해약시환불기준"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품사양"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자 상담관련전화번호"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소유권이전조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품의고장분실훼손시소비자책임"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중도해약시환불기준"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용조건,이용기간"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상품제공방식"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="최소시스템사양,필수소프트웨어"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="청약철회또는계약의해제해지에따른효과"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유효기간,이용조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용가능매장"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="잔액환급조건"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="재질"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="유효기간,이용조건"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용가능매장"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="환불조건 및 방법"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="주연(공연에 한함)"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="관람등급"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상영,공연시간"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="상영,공연장소"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="예매취소조건"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소환불방법"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련 전화번호"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="용도 및제형"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조연월 및 유통기한"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중량 용량 매수"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="효과 효능"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입자"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="어린이 보호포장대상 유무"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용된화학물질명칭"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용시 주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="신고번호/승인번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="중량또는용량,표준사용량"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="효과,효능"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용대상자 및사용범위"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="수입자"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="어린이보호포장대상유무"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="물질의명칭"
                name="g"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="g" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제품 유해성 위해성표시"
                name="h"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="h" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="사용방법 및 사용상주의사항"
                name="i"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="i" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="승인번호"
                name="j"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="j" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련전화번호"
                name="k"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="k" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법에의한 인허가사항"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="이용조건"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소중도해약해지조건,환불기준"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="취소환불방법"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="소비자상담관련 전화번호"
                name="f"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="f" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
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
                (영유아용품)
              </h1>
              <Form.Item
                label="품명 및 모델명"
                name="a"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="a" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="법에 의한 인허가사항"
                name="b"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="b" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조국,원산지"
                name="c"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="c" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="제조자"
                name="d"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="d" onChange={onChangeLow} />
              </Form.Item>
              <Form.Item
                label="AS,소비자상담 전화번호"
                name="e"
                rules={[{ required: true, message: "입력은 필수입니다" }]}
              >
                <Input type={"text"} name="e" onChange={onChangeLow} />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Form>
          </div>
        );
        break;
      default:
        return <div>품목명을확인해주세요</div>;
    }
  };

  const detailImage = DetailImage.map((item, index) => {
    return (
      <div key={index + item.filepath}>
        <img
          style={{ width: "100%", objectFit: "cover" }}
          src={`http://localhost:8080/upload/${item.filepath}`}
          alt=""
        />
        <br />
      </div>
    );
  });

  return (
    <>
      <BackTop />
      <HeaderContainer />
      <div style={{ width: "100%", padding: "3rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{Product.productName}</h1>
        </div>
        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            <ProductImage detail={Product} />
          </Col>

          <Col lg={12} sm={24}>
            <ProductInfo detail={Product} proId={productId} pandas={Pandas} />
          </Col>

          <Col lg={24} sm={24}>
            <Tabs defaultActiveKey="1" type="card" size={"small"}>
              <TabPane tab="상품 상세" key="1">
                <div
                  style={{
                    background: "red",
                    justifyContent: "center",
                  }}
                >
                  {detailImage}
                </div>
              </TabPane>
              <TabPane tab="판다보기" key="2">
                <PandaView pandas={Pandas} />
              </TabPane>
              <TabPane tab="상품정보" key="3">
                {lowOption("1")}
              </TabPane>
              <TabPane tab="판매자/반품/교환정보" key="4">
                <h2>판매자정보</h2>
                <table>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      상점명
                    </td>
                    <td>{Product.shopName}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      대표자
                    </td>
                    <td>{Product.representative}</td>
                  </tr>

                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      사업자등록번호
                    </td>
                    <td>{Product.crn}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      통신판매업번호
                    </td>
                    <td>{Product.number}</td>
                  </tr>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      사업장 소재지
                    </td>
                    <td>{Product.comaddress}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      고객센터 번호
                    </td>
                    <td>{Product.shopName}</td>
                  </tr>
                </table>

                <h2>반품 교환안내</h2>
                <table>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      판매자 지정택배사
                    </td>
                    <td>{Product.reship}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      반품배송비
                    </td>
                    <td>{Product.returnpee}</td>
                  </tr>

                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      교환배송비
                    </td>
                    <td>{Product.tradepee}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      보내실 곳
                    </td>
                    <td>{Product.returnaddress}</td>
                  </tr>
                  <tr>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      반품/교환 사유에 따른요청가능기간
                    </td>
                    <td>{Product.candate}</td>
                    <td
                      style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}
                    >
                      반품/교환 불가능사유
                    </td>
                    <td>{Product.noreturn}</td>
                  </tr>
                </table>
                <h2>주의사항</h2>
                <h20>
                  *전자상거래 등에서의 소비자보호에 관한 법률에 의한 반품규정이
                  판매자가 지정한 반품조건보다 우선합니다
                </h20>
                <br />
                <h10>
                  *전자상거래 등에서의 소비자보호에 관한 법률에 의거하여
                  미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지 않으면
                  미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.
                </h10>
                <br />
                <h10>
                  *전기용품 및 생활용품 안전관리법 및 어린이제품 안전 특별법
                  규정에 의한 안전관리대상 품목인 전기용품, 생활용품,
                  어린이제품을 판매 또는 구매하실 경우에는 해당 제품이 안전인증,
                  안전확인, 공급자적합성확인, 안전기준준수 적용 제품인지
                  확인하시기 바랍니다.
                </h10>
                <br />
                <h10>
                  *쇼핑호스트 판다의 결제시스템을 이용하지 않고 판매자와 직접
                  거래하실 경우 상품을 받지 못하거나 구매한 상품과 상이한 상품을
                  받는 등 피해가 발생할 수 있으니 유의하시기 바랍니다.
                </h10>
                <br />
                <h10>
                  *쇼핑호스트 판다에 등록된 판매상품과 상품의 내용은 판매자가
                  등록한 것으로 쇼핑호스트 판다는 등록된 내용에 대하여 일체의
                  책임을 지지 않습니다.
                </h10>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DetailProductPage;
