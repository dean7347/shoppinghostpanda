import React, { useEffect, useCallback, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Collapse,
} from "antd";
import styled from "styled-components";
import axios from "../../../node_modules/axios/index";

const PandaRegFormContainer = () => {
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
    if ([PandaName, MainChName, intCategory].includes("")) {
      SetError("빈 칸을 모두 입력하세요");
      return;
    }
    if (Termsagree === false) {
      SetError("약관에 필수 동의해야 합니다");
    }
    const body = {
      pandaname: PandaName,
      mainchname: MainChName,
      intcategory: intCategory,
      termsagree: Termsagree,
      infoagree: Infoagree,
    };

    axios.post("/api/regpanda", body).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert(
          "판다가입신청이 완료되었습니다 승인이후 판다로 활동할 수 있습니다"
        );
      } else {
        alert(
          "판다가입신청에 실패했습니다. 해당 현상이 계속된다면 문의주시기 바랍니다"
        );
      }
    });
  };

  const [error, SetError] = useState("");
  const [PandaName, SetPandaName] = useState("");
  const PandaNameHandler = (e) => {
    e.preventDefault();
    SetPandaName(e.target.value);
  };

  const [MainChName, SetMainCh] = useState("");
  const MainChHandler = (e) => {
    e.preventDefault();
    SetMainCh(e.target.value);
  };

  const [intCategory, SetintCategory] = useState("");
  const intCategoryHandler = (e) => {
    e.preventDefault();
    SetintCategory(e.target.value);
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
        <h1>판다 등록</h1>
      </div>
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
        <Form.Item label="판다 이름">
          <Input
            type={text}
            value={PandaName}
            onChange={PandaNameHandler}
            placeholder="활동하실 이름을 입력해주세요"
          />
        </Form.Item>
        <Form.Item label="주요 채널">
          <Input
            type={text}
            value={MainChName}
            onChange={MainChHandler}
            placeholder="유튜브,블로그,인스타 메인화면 URL을 입력해주세요"
          />
        </Form.Item>

        <Form.Item label="관심 카테고리">
          <Input
            type={text}
            value={intCategory}
            onChange={intCategoryHandler}
            placeholder=",로 구분해주세요 ex)등산,육아"
          />
        </Form.Item>
        <Form.Item label="정보수신동의" valuePropName="checked">
          <Switch checked={Infoagree} onChange={InfoagreeHandler} />
        </Form.Item>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form.Item label="제출하기">
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default PandaRegFormContainer;
