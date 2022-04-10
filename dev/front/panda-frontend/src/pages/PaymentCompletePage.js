import React, { useEffect, useState } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "antd";

function PagementCompletePage(props) {
  let history = useHistory();

  // //console.log(props);
  if (props.location.state === undefined) {
    alert("잘못된 접근입니다");
    history.goBack();
  }
  // if (!props.location.state.prevPath? && === "/user/payments") {
  //   alert("잘못된 접근입니다");
  // }
  return (
    <>
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col span={24}>
            <div>주문이 완료되었습니다</div>
          </Col>
          <Col span={24}>
            <Button
              onClick={() => {
                window.location.replace("/");
              }}
            >
              {" "}
              홈화면으로 돌아가기
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default PagementCompletePage;
