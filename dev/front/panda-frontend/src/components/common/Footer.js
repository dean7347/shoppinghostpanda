import React from "react";
import { Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <hr style={{ backgroundColor: "red" }} />
      <div
        style={{
          textAlign: "left",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/service">
          <div style={{ padding: "3px" }}>서비스 소개</div>
        </Link>
        <div style={{ padding: "3px" }}>|</div>
        <Link to="/terms">
          <div style={{ padding: "3px" }}>이용 약관</div>
        </Link>

        <div style={{ padding: "3px" }}>|</div>
        <Link to="/private">
          <div style={{ padding: "3px" }}>개인정보 처리 방침</div>
        </Link>
      </div>
      <Row gutter={[18, 18]} style={{ justifyContent: "center" }}>
        {/* <div
          style={{
            //   textAlign: "left",

            // display: "flex",
            justifyContent: "center",
          }}
        > */}
        <Col lg={6} sm={6}>
          {/* <div
            // style={{ marginLeft: "20px", marginRight: "20px" }}
            > */}
          <hr />
          쇼핑호스트 판다 <br />
          대표: 김진동 <br />
          사업자 등록번호 : 484-08-01858 <br />
          통신판매업 신고 : 2021-경북칠곡-0409 <br />
          <br />
          경상북도 칠곡군 왜관읍 공단로1길 7, 1-1호 청년 1-1호 <br />
          (칠곡군 1인 창조기업 중장년 기술창업센터)
          <br />
          {/* </div> */}
        </Col>
        <Col lg={6} sm={6}>
          {/* <div
            // style={{
            //   float: "left",
            //   paddingLeft: "10px",
            //   paddingRight: "10px",
            // }}
            // > */}
          <hr />
          고객센터 <br />
          (주 5일 오전 10시 ~ 오후 5시까지)
          <br /> 대표번호 :054-974-7868
          <br /> 메일 : shoppinghostpanda@gmail.com
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* </div> */}
        </Col>
        <Col lg={6} sm={6}>
          {/* <div> */}
          <hr />
          Copyright@ 2021 shoppinghostPanda All right reserved.
          <br />
          쇼핑호스트 판다는 통신판매중개자이며 통신판매의 당사자가 아닙니다.
          <br />
          따라서 쇼핑호스트 판다는 상품 거래 정보 및 거래에 대하여 책임을 지지
          않습니다.
          <br />
          {/* </div> */}
        </Col>
        {/* </div> */}
      </Row>
    </>
  );
};
export default Footer;