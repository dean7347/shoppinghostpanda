import React, { useState } from "react";
import { Form, Input, Button, Switch, Collapse } from "antd";
import styled from "styled-components";
import axios from "../../../node_modules/axios/index";

const ShopRegFormContainer = ({ history }) => {
  const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
  `;

  const { Panel } = Collapse;
  function callback(key) {
    console.log(key);
  }

  const [form, setForm] = useState({
    shopName: "",
    representative: "",
    crn: "",
    telnum: "",
    freepee: "",
    nofree: "",
    priPhone: "",
    csPhone: "",
    csTime: "",
    toPanda: "",
    reship: "",
    returnpee: "",
    tradepee: "",
    returnaddress: "",
    candate: "",
    noreturn: "",
  });
  const {
    shopName,
    representative,
    crn,
    telnum,
    freepee,
    nofree,
    priPhone,
    csPhone,
    csTime,
    toPanda,
    reship,
    returnpee,
    tradepee,
    returnaddress,
    candate,
    noreturn,
  } = form;

  const onChangeF = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  // Infoagree: "",
  // Termsagree: "",
  // const [Infoagree, setInfoAgree] = useState(false);
  // function onChangeInfo(checked) {
  //   console.log(`switch to ${checked}`);
  //   setInfoAgree(checked);
  // }

  const onClick = async (e) => {
    try {
      const body = {
        shopName: shopName,
        representative: representative,
        crn: crn,
        telnum: telnum,
        freepee: freepee,
        nofree: nofree,
        priPhone: priPhone,
        csPhone: csPhone,
        csTime: csTime,
        toPanda: toPanda,
        reship: reship,
        returnpee: returnpee,
        tradepee: tradepee,
        returnaddress: returnaddress,
        candate: candate,
        noreturn: noreturn,
        tagree: e.Termsagree,
        iagree: e.Infoagree,
      };

      if (
        !shopName ||
        !representative ||
        !crn ||
        !telnum ||
        !freepee ||
        !nofree ||
        !priPhone ||
        !csPhone ||
        !csTime ||
        !toPanda ||
        !reship ||
        !returnpee ||
        !tradepee ||
        !returnaddress ||
        !candate ||
        !noreturn
      ) {
        alert("모든정보를 입력해 주세요");
        return;
      }

      if (e.Termsagree === false || e.Infoagree === false) {
        alert("약관,정보수신에 동의하셔야 합니다");
        return;
      }
      await axios.post("/createShop", body).then((response) => {
        if (response.data.success) {
          alert("샵등록신청 성공!");
        } else {
          console.log("실패");

          console.log(body);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  // async function onSubmit(e) {
  //   console.log("온서브밋");
  //   console.log(e);
  //   if (
  //     !shopName ||
  //     !representative ||
  //     !crn ||
  //     !telnum ||
  //     !freepee ||
  //     !nofree ||
  //     !priPhone ||
  //     !csPhone ||
  //     !csTime ||
  //     !toPanda ||
  //     !reship ||
  //     !returnpee ||
  //     !tradepee ||
  //     !returnaddress ||
  //     !candate ||
  //     !noreturn
  //   ) {
  //     alert("모든정보를 입력해 주세요");
  //   }

  //   if (e.Termsagree === false || e.Infoagree === false) {
  //     alert("약관,정보수신에 동의하셔야 합니다");
  //   }

  //   const body = {
  //     shopName: shopName,
  //     representative: representative,
  //     crn: crn,
  //     telnum: telnum,
  //     freepee: freepee,
  //     nofree: nofree,
  //     priPhone: priPhone,
  //     csPhone: csPhone,
  //     csTime: csTime,
  //     toPanda: toPanda,
  //     reship: reship,
  //     returnpee: returnpee,
  //     tradepee: tradepee,
  //     returnaddress: returnaddress,
  //     candate: candate,
  //     noreturn: noreturn,
  //     Termsagree: e.Termsagree,
  //     Infoagree: e.Termsagree,
  //   };
  //   console.log("body");
  //   const data = await body;
  //   console.log(data);
  //   console.log(e.Termsagree);

  //   await axios.post("/createShop", data).then((response) => {
  //     if (response.data.success) {
  //       alert("샵등록신청 성공!");
  //     } else {
  //       alert("샵등록에 실패했습니다");
  //     }
  //   });
  // }

  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  return (
    <>
      <br />
      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Collapse defaultActiveKey={["1"]} onChange={callback}>
          <Panel header="약관" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="결제관리" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="의무" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>

      <br />
      <br />

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onClick}
      >
        <Form.Item
          label="약관 동의"
          name="Termsagree"
          valuePropName="Termsagree"
        >
          <Switch />
        </Form.Item>
        <h1>상점 관련 정보</h1>
        <Form.Item label="상호명">
          <Input
            type={text}
            name="shopName"
            onChange={onChangeF}
            placeholder="상점 이름을 입력해주세요"
          />
        </Form.Item>
        <Form.Item label="대표자">
          <Input
            type={text}
            name="representative"
            onChange={onChangeF}
            placeholder="상점 이름을 입력해주세요"
          />
        </Form.Item>

        <Form.Item label="사업자등록번호">
          <Input
            type={text}
            name="crn"
            onChange={onChangeF}
            placeholder="상점 이름을 입력해주세요"
          />
        </Form.Item>

        <Form.Item label="통신판매업 신고번호">
          <Input
            type={text}
            name="telnum"
            onChange={onChangeF}
            placeholder="상점 이름을 입력해주세요"
          />
        </Form.Item>
        <Form.Item label="무료 배송 비용">
          <Input
            type={"number"}
            name="freepee"
            onChange={onChangeF}
            placeholder="무료배송 비용을 입력해주세요 무료배송시 총액 산정은 할인,수수료 등 산정 전 순수한 상품 금액입니다"
          />
        </Form.Item>

        <Form.Item label="유료 배송시 택배 비용">
          <Input
            type={"number"}
            name="nofree"
            onChange={onChangeF}
            placeholder="유료배송시 택배 비용을 입력해 주세요"
          />
        </Form.Item>

        <Form.Item label="개인 전화번호">
          <Input
            type={text}
            name="priPhone"
            onChange={onChangeF}
            placeholder="긴급상황시 연락할 연락처(개인)을 입력해주세요(외부노출 x)"
          />
        </Form.Item>

        <Form.Item label="고객센터 전화번호">
          <Input
            type={text}
            name="csPhone"
            onChange={onChangeF}
            placeholder="연락처를 입력해주세요 상품 등록시 외부에 노출됩니다"
          />
        </Form.Item>

        <Form.Item label="고객센터 운영시간">
          <Input
            type={text}
            name="csTime"
            onChange={onChangeF}
            placeholder="연락처를 입력해주세요 상품 등록시 외부에 노출됩니다"
          />
        </Form.Item>
        <Form.Item
          label="정보수신 동의"
          name="Infoagree"
          valuePropName="Infoagree"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="toPanda"
          onChange={onChangeF}
          label="To 판다"
          rules={[
            {
              required: true,
              message:
                "판다(상품홍보인)에게 전달할 메세지입니다 ex) 매장방문,제작체험 가능합니다",
            },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={250}
            name="toPanda"
            onChange={onChangeF}
          />
        </Form.Item>

        <h1>반품 관련 정보</h1>
        {/* 반품 교환 정보 */}

        <Form.Item label="반품 지정 택배사">
          <Input
            type={text}
            name="reship"
            onChange={onChangeF}
            placeholder="반품 지정택배사를 입력해주세요"
          />
        </Form.Item>

        <Form.Item label="반품 배송비">
          <Input
            type={"number"}
            name="returnpee"
            onChange={onChangeF}
            placeholder="ex)편도 3000원 (최초 배송비 무료인 경우 6000원 부과)"
          />
        </Form.Item>

        <Form.Item label="교환 배송비">
          <Input
            type={"number"}
            name="tradepee"
            onChange={onChangeF}
            placeholder="구매자 귀책사유로 인한 교환배송"
          />
        </Form.Item>

        <Form.Item label="보내실 곳">
          <Input
            type={text}
            name="returnaddress"
            onChange={onChangeF}
            placeholder="구매자 귀책사유로 인한 교환배송"
          />
        </Form.Item>
        <h3>반품/교환 사유에 따른 요청 가능 기간</h3>
        <Form.Item
          name="candate"
          onChange={onChangeF}
          label="입력"
          rules={[
            {
              required: true,
              message: "반품/교환 사유에 따른 요청 가능 기간",
            },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={250}
            name="candate"
            onChange={onChangeF}
          />
        </Form.Item>

        <Form.Item
          name="noreturn"
          onChange={onChangeF}
          label="반품 교환 불가능 사유"
          rules={[
            {
              required: true,
              message: "반품 교환 불가능 사유",
            },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={500}
            name="noreturn"
            onChange={onChangeF}
          />
        </Form.Item>

        <Form.Item label="제출하기">
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ShopRegFormContainer;
