import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Collapse, Row, Col } from "antd";
import styled from "styled-components";
import axios from "../../node_modules/axios/index";
import HeaderContainer from "../containers/common/HeaderContainer";
import queryString from "query-string";
const FindIdPage = ({ history }) => {
  const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
  `;

  const { Panel } = Collapse;
  const [visibleId, setVisibleId] = useState("none");
  const [findId, setFindId] = useState("none");

  const isEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
  };
  const [certifiNum, setCertifiNum] = useState("");

  const onClick = async (e) => {
    try {
      if (!isEmail(e.id)) {
        alert("email 형식이 올바르지 않습니다");
        return;
      }
      if (e.password !== e.passwordconfirm) {
        alert("패스워드가 일치하지 않습니다!");
        return;
      }
      if (certifiNum === "") {
        alert("본인인증이 필요합니다!");
        return;
      }

      const body = {
        adult: e.adult,
        apprterm: e.apprterm,
        priagree: e.priagree,
        email: e.id,
        password: e.password,
        phone: certifiNum,
      };
      axios.post("/api/signup", body).then((response) => {
        if (response.data.success) {
          alert("회원가입에 성공했습니다 ");
          window.location.replace("/");
        } else {
          alert(response.data.message);
        }
      });
    } catch (e) {
      alert("회원가입 도중 오류가 발생했습니다");
    }
  };

  ///본인인증
  const onTest = () => {
    console.log("테스트를위한");
    console.log(certifiNum);

    const body = {
      muid: certifiNum,
    };

    axios.post("/api/authentication", body).then((response) => {
      if (response.data.success) {
      } else {
      }
    });
  };
  const onClcikPhone = () => {
    console.log("온크릭");
    var IMP = window.IMP; // 생략 가능
    IMP.init("imp16473466"); // 예: imp00000000
    IMP.certification(
      {
        // param
        // merchant_uid: "ORD20180131-0000011", // 주문 번호
        // m_redirect_url: "{리디렉션 될 URL}", // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
        popup: true, // PC환경에서는 popup 파라메터가 무시되고 항상 true 로 적용됨
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          // 인증 성공 시 로직,
          console.log("인증성공");
          setCertifiNum(rsp.imp_uid);
          const body = {
            code: rsp.imp_uid,
          };
          axios.post("/api/findid", body).then((response) => {
            if (response.data.success) {
              setVisibleId("flex");
              setFindId(response.data.success.email);
            } else {
              alert("해당 핸드폰 번호로 가입된 아이디가 없습니다");
            }
          });
        } else {
          // 인증 실패 시 로직,
          console.log("인증실패");
          console.alert("인증에 실패했습니다 다시 시도해주세요");
        }
      }
    );
  };
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  ////
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row gutter={[0, 20]} justify="center">
        <Col span={20}>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            ID/PW찾기
          </div>
        </Col>
        <Col span={15}>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
              borderRadius: "15px ",
              border: "1px solid",
            }}
          >
            <Col span={24}>본인인증</Col>
            <Col span={24}>아이디는 : 입니다</Col>
            <Col span={24}>비밀번호 변경폼</Col>
            <Col span={24}>비밀번호 확인폼</Col>
            <Col span={24}>제출버튼</Col>
            <Col span={24}>로그인버튼</Col>
            <Col span={24}>회원가입 버튼</Col>
          </div>
        </Col>
      </Row>

      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <br />
        <Row>
          <Col span={24}>
            <h1>ID/PW찾기</h1>
          </Col>
          <div
            style={{
              borderRadius: "15px solid",
              background: "red",
              width: "100%",
            }}
          >
            zz
            <Col>
              <div style={{ borderRadius: "3px solid", background: "blue" }}>
              </div>
            </Col>
          </div>

          <Col></Col>
          <Col></Col>

          <Col></Col>
        </Row>
      </div>

      <br />

      <Row align={"center"}></Row>
      <div
        style={{
          display: { visibleId },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            label=""
            name="certifiNum"
            rules={[
              {
                message: "본인인증을 완료해야합니다",
              },
            ]}
          >
            {findId}
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요",
              },
            ]}
          >
            <Input.Password placeholder="비밀번호" />
          </Form.Item>
          <Form.Item
            label="비밀번호 확인    "
            name="passwordconfirm"
            rules={[
              {
                required: true,
                message: "비밀번호 확인",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="비밀번호변경">
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
      </div> */}
    </>
  );
};

export default FindIdPage;
