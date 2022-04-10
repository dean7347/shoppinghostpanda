import React, { useState } from "react";
import { Form, Input, Button, Switch, Collapse } from "antd";
import styled from "styled-components";
import axios from "../../api/axiosDefaults";

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
    // //console.log(key);
  }

  const onSubmit = (e) => {
    // //console.log("w");
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
      // //console.log(response.data);
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

  const contentDescreiption = `
    쇼핑호스트 판다에 업로드 되는 자료화면으로 2분 이내의 쇼핑호스트판다 자체 홍보영상으로 사용될 수 있습니다.
  `;
  const dutyText = `
  제1조(목적)
  이 약관은, 쇼핑호스트판다가  제공하는 전자상거래 관련 서비스 및 기타 서비스(이하 ‘서비스’라 함)를 이용하기 위하여쇼핑호스트판다 운영하는 판다센터(이하 ‘판다센터’라 함)에 판다회원으로 가입한 자(이하 ‘판매회원’이라 함)와 쇼핑호스트판다(이하 총칭하여 ‘회사’라 함) 간의 권리, 의무 및 제반절차를 확정하고 이를 이행함으로써 상호 발전을 도모하는 것을 그 목적으로 합니다.
  제2조(의무사항)
  1. 판다는  약관에 동의함으로써 상품의 허위 사실, 과장된 사실을 게시하지 않아야 합니다.
  2. 판매자와 쇼핑호스트 판다는 소비자 보호법을 최 우선시합니다.
  3. 22년 4월 현재는 오직 "영상" 컨텐츠만을 취급하며 영상의 내부 혹은 설명란에 반듯이 상품 링크가 있어야 합니다.
  4. 악의적인 혹은 사실과다른 영상, 부적절한 영상 대중의 정서에 맞지 않는 영상은 예고없이 중지될 수 있습니다.
  `;
  const paymentText = `
  제1조(지급일)
  쇼핑호스트 판다의 결제대금은 "구매확정" 이후 가장 빠른 월요일(영업일이 아닐경우 화요일)에 지급됩니다.
  
  제2조(정산관련 안내)
  1. 현재 쇼핑호스트 판다의 판도 활동자는 판다영상을 등록한 물품 판매액의(10%, 택배비 제외)를 제공받습니다
  2. 쇼핑호스트 판다는 국세청의 정책기조에 따라 정산되는 금액에 대한 세금계산서 발행을 요청할 수 있으며 판매자는 이에 응해야 합니다.
  3. 쇼핑호스트 판다의 판다 지급금은 정산시 원천징수이후 지급됩니다
  4. 부적절한 영상, 삭제된 영상에 한해서 지급 보류,거절 될 수 있습니다
  `;

  const termText = `
  제 1조(목적)
  이 약관은, 쇼핑호스트판다가  제공하는 전자상거래 관련 서비스 및 기타 서비스(이하 ‘서비스’라 함)를 이용하기 위하여 쇼핑호스트판다 운영하는 판다메뉴(이하 ‘판다메뉴’라 함)에 판다회원으로 가입한 자(이하 ‘판다’이라 함)와 쇼핑호스트판다(이하 총칭하여 ‘회사’라 함) 간의 권리, 의무 및 제반절차를 확정하고 이를 이행함으로써 상호 발전을 도모하는 것을 그 목적으로 합니다.
  제2조 (정의)
  ① 이 "약관"에서 사용하는 용어의 정의는 다음과 같습니다.
  "판다"라 함은 판매자가 등록한 상품을 홍보하는 홍보인을 말합니다.
  제3조 (약관의 게시 및 개정)
  ① 회사는 이 약관의 내용을 판다회원 쉽게 알 수 있도록 판다센터 초기화면 또는 연결화면을 통하여 게시합니다.
  ② 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이 약관을 개정할 수 있으며, 이 경우 개정내용과 적용일자를 명시하여 판매자센터를 통해 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 다만, 변경 내용이 판매자에게 불리한 변경의 경우에는 개정약관의 적용일자 30일 전부터 적용일자까지 공지합니다.
  ③ 판다회원이 개정약관에 동의하지 않는 경우에는 개정 약관의 적용일 이전에 거부 의사를 표시하고 이 약관에 의한 이용계약을 해지할 수 있습니다.
  ④ 회사가 본 조 제2항에 따라 개정약관을 공지 또는 통지하면서 판다회원에게 적용일 전까지 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을 명확하게 공지 또는 통지하였음에도 판매회원이 명시적으로 거부의사를 표명하지 아니한 경우 개정약관에 동의한 것으로 봅니다.
  제4조 (약관의 효력)
  ① 회사는 이 약관에 규정되지 않은 세부적인 내용에 대해 개별 운영 정책 등(이하 ‘운영정책‘이라 함)을 제정하여 운영할 수 있으며, 해당 내용을 판다센터를 통하여 게시합니다. 운영정책은 이 약관과 더불어 서비스 이용계약(이하 ‘이용계약‘이라 함)의 일부를 구성합니다.
  ② 회사는 서비스 중 특정 서비스에 관한 약관(이하 ‘개별약관‘이라 함)을 별도로 제정할 수 있으며, 판다회원이 개별약관에 동의한 경우 개별약관은 이용계약의 일부를 구성하고 개별약관에 이 약관과 상충하는 내용이 있을 경우 개별 약관이 우선적으로 적용됩니다.
  ③ 본 약관에 의해 판다회원으로 가입하고자 하는 자는 구매회원이용약관의 내용을 숙지하고 구매회원과 회사간의 권리∙의무관계에 대해 동의함을 확인합니다.
  제5조 (이용계약의 성립)
  ① 이용계약은 서비스를 이용하고자 하는 자(이하 ‘이용신청자‘라 함)가 이 약관에 동의하고 회사가 정한 절차에 따라 판다회원 가입을 신청하며, 이에 대해 회사가 심사를 거쳐 승낙함으로써 성립합니다. 회사는 이용승낙의 의사표시를 해당 서비스 화면에 게시하거나 email 또는 기타 방법으로 할 수 있습니다.
  ② 이용신청자는 회사가 별도로 요청하는 증빙서류가 있는 경우 신속히 제출하여야 하며, 회사는 해당 서류를 징구하는 시점까지 가입신청에 대한 승낙을 보류하거나 거부할 수 있습니다.
  ③ 판다회원 가입은 만 14세 이상의 개인(개인 사업자 포함) 또는 법인사업자가 할 수 있으며, 만 19세 미만의 판다회원 가입신청에 대해서 회사가 법정대리인의 동의서 및 입증자료의 제출을 요구하는 경우 이용신청자는 이에 적극 협조하여야 합니다.
  ④ 회사는 제1항에 따라 판다회원 가입을 신청 한 자 중에서 아래 각호에 해당되는 경우에는 승인을 거부할 수 있으며, 등록이 된 이후에도 아래 각호의 사유가 확인된 경우에는 승낙을 취소할 수 있습니다.
  가입을 신청한 자가 이 약관 및 회사의 다른 서비스와 관련하여 이전에 회원 자격을 상실한 적이 있는 경우
  실명이 아니거나 타인의 정보 등(예)주민등록번호, 사업자번호, I-PIN 등)를 이용한 경우
  허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우
  회사로부터 자격 정지 조치 등을 받은 판다회원이 그 조치기간 중에 이용계약을 임의 해지하고 재이용신청을 하는 경우
  기술적 지장 등으로 이용신청에 대한 승낙이 어려운 경우
  가입을 신청한 자의 귀책사유로 인하여 승인이 불가능하거나 필수 서류 또는 회사가 요청하는 서류를 제출하지 않는 등 기타 제반 사항을 위반하여 신청하는 경우
  기타 이 약관에 위배되거나 위법 또는 부당한 이용신청 등 회사가 합리적인 판단에 의하여 필요하다고 인정하는 경우
  ⑤ 판다회원은 회원가입정보와 관련하여 주소지 또는 대금결제를 위한 통장계좌 등의 변경이 있을 경우 즉시 회사에 이를 통지하여야 하며, 회사는 통지의 지연으로 인하여 발생한 손해에 대하여 책임을 지지 않습니다.
  제6조 (대리행위 및 보증의 부인)
  ① 회사는 판매회원과 판다회원간의 거래를 위한 통신판매중개시스템의 운영 및 관리 책임만을 부담하며, 상품의 판매 또는 구매와 관련하여 회사의 어떠한 행위도 판매회원 또는 구매회원을 대리하는 행위로 간주되지 않습니다.
  ② 회사는 서비스를 통하여 이루어지는 회원간의 거래와 관련하여 판매의사 또는 구매의사의 존부 및 진정성, 등록물품의 품질, 완전성, 안전성, 적법성 및 타인의 권리에 대한 비침해성, 회원이 입력하는 정보 및 그 정보를 통하여 링크된 URL에 게재된 자료의 진실성 등 일체에 대하여 보증하지 아니하며, 이와 관련한 일체의 위험과 책임은 해당 회원이 부담해야 합니다.
  ③ 회사는 판다회원이 서비스를 통해 취급하는 상품의 판매효과에 대하여 어떠한 보증을 제공하지 아니하며, 판다회원은 자신이 의도한 판매효과의 미흡 등을 이유로 회사에 어떠한 책임도 물을 수 없습니다.
  제7조 (서비스의 종류와 이용료)
  ① 이 약관에 따라 회사가 제공하는 서비스는 다음과 같습니다.
  E-Commerce Platform(상품등록) 개발 및 운영을 통한 통신판매중개서비스
  판다회원 제공한 상품 이미지 등 상품 정보 및 데이터베이스를 활용하여 이용자들이 상품의 선호도를 선택하고 광고주∙상품에 대한 의견을 공유하는 등 다양한 형태의 서비스
  판다가 다양한 채널을  통해 실시간 스트리밍 방식,제작된 영상 등으로 자신이 판매하는 상품에 관한 영상(음성, 채팅을 포함함)을 구매회원 등 제3자에게 제공할 수 있게 하는 서비스(이하 '판다 서비스')
  기타 통신판매중개 와 관련한 제반 서비스
  ② 회사가 제공하는 전항의 서비스는 판다회원이 재화 등을 거래할 수 있도록 서비스의 이용을 허락하거나, 통신판매를 알선하는 것을 목적으로 하며, 개별 판다회원이 서비스에 등록한 상품과 관련해서 회사는 일체의 책임을 지지 않습니다.
  ③ 회사는 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 서비스 제공을 원칙으로 하지만, 정기점검이나 시스템의 업그레이드가 필요한 날이나 시간에 서비스를 일시 중단할 수 있으며(예정된 정기점검일은 월요일 새벽입니다), 예정되어 있는 작업으로 인해 서비스를 일시 중단하는 경우 판매자 센터 등을 통해 사전에 공지합니다.
  <부칙>
  별지 1. 해당 약관의 동의는 사항들은 판다신청안내페이지에 약관,정산관리,의무,컨텐츠 사용안내에 모두 동의한것으로 간주합니다.
  최초 공지 일자
  2022년 3월 31일
  수정 일자
  -
  적용 일자
  2022년 3월 31일
  `;
  return (
    <>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>판다 등록</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          whiteSpace: "pre-wrap",
        }}
      >
        <Collapse onChange={callback}>
          <Panel header="약관" key="1">
            <p>{termText}</p>
          </Panel>
          <Panel header="정산관리" key="2">
            <p>{paymentText}</p>
          </Panel>
          <Panel header="의무" key="3">
            <p>{dutyText}</p>
          </Panel>
          <Panel header="컨텐츠 사용안내" key="4">
            <p>{contentDescreiption}</p>
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
        <Form.Item label="전체약관 동의" valuePropName="checked">
          <Switch checked={Termsagree} onChange={TermsagreeHandler} />
        </Form.Item>
        <Form.Item label="판다 이름">
          <Input
            type={"text"}
            value={PandaName}
            onChange={PandaNameHandler}
            placeholder="활동하실 이름을 입력해주세요"
          />
        </Form.Item>
        <Form.Item label="주요 채널">
          <Input
            type={"text"}
            value={MainChName}
            onChange={MainChHandler}
            placeholder="유튜브,블로그,인스타 메인화면 URL을 입력해주세요"
          />
        </Form.Item>

        <Form.Item label="관심 카테고리">
          <Input
            type={"text"}
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
