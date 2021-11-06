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
  const [componentSize, setComponentSize] = useState("default");
  const { Panel } = Collapse;
  function callback(key) {
    console.log(key);
  }

  const onSubmit = (e) => {
    console.log("w");
    // const { shopName, crn, freePrice, address, number } = form;
    // dispatch(shopRegister({ shopName, crn, freePrice, address, number }));
    // if ([PandaName, MainChName, intCategory].includes("")) {
    //   SetError("빈 칸을 모두 입력하세요");
    //   return;
    // }
    // if (Termsagree === false) {
    //   SetError("약관에 필수 동의해야 합니다");
    // }
    // const body = {
    //   pandaname: PandaName,
    //   mainchname: MainChName,
    //   intcategory: intCategory,
    //   termsagree: Termsagree,
    //   infoagree: Infoagree,
    // };

    // axios.post("/api/regpanda", body).then((response) => {
    //   console.log(response.data);
    //   if (response.data.success) {
    //     alert(
    //       "판다가입신청이 완료되었습니다 승인이후 판다로 활동할 수 있습니다"
    //     );
    //   } else {
    //     alert(
    //       "판다가입신청에 실패했습니다. 해당 현상이 계속된다면 문의주시기 바랍니다"
    //     );
    //   }
    // });
  };

  const [Termsagree, SetTermsagree] = useState(false);
  const TermsagreeHandler = (e) => {
    // e.preventDefault();
    SetTermsagree(e);
  };

  const [Infoagree, SetInfoagree] = useState(false);
  const InfoagreeHandler = (e) => {
    // e.preventDefault();
    SetInfoagree(e);
  };

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
        initialValues={{
          size: componentSize,
        }}
        size={componentSize}
        onFinish={onSubmit}
      >
        <Form.Item label="약관 동의" valuePropName="checked">
          <Switch checked={Termsagree} onChange={TermsagreeHandler} />
        </Form.Item>
        <Form.Item label="상점 이름">
          <Input
            type={text}
            // value={PandaName}
            // onChange={PandaNameHandler}
            placeholder="상점 이름을 입력해주세요"
          />
        </Form.Item>
        <Form.Item label="무료 배송 비용">
          <Input
            type={"number"}
            // value={MainChName}
            // onChange={MainChHandler}
            placeholder="무료배송 비용을 입력해주세요 무료배송시 총액 산정은 할인,수수료 등 산정 전 순수한 상품 금액입니다"
          />
        </Form.Item>

        <Form.Item label="유료 배송 비용">
          <Input
            type={text}
            // value={intCategory}
            // onChange={intCategoryHandler}
            placeholder="유료배송시 택배 비용을 입력해 주세요"
          />
        </Form.Item>

        <Form.Item label="개인 전화번호">
          <Input
            type={text}
            // value={intCategory}
            // onChange={intCategoryHandler}
            placeholder="긴급상황시 연락할 연락처(개인)을 입력해주세요"
          />
        </Form.Item>

        <Form.Item label="영업장 전화번호">
          <Input
            type={text}
            // value={intCategory}
            // onChange={intCategoryHandler}
            placeholder="연락처를 입력해주세요 상품 등록시 외부에 노출됩니다"
          />
        </Form.Item>
        <Form.Item label="정보수신동의" valuePropName="checked">
          <Switch checked={Infoagree} onChange={InfoagreeHandler} />
        </Form.Item>

        <Form.Item label="To 판다">
          <Input
            type={text}
            // value={intCategory}
            // onChange={intCategoryHandler}
            placeholder="판다(상품홍보인)에게 전달할 메세지입니다 ex) 매장방문,제작체험 가능합니다"
          />
        </Form.Item>
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
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
