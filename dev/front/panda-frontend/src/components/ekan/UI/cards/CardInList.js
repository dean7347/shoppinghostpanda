import { useEffect, useState, useScript } from "react";
import React from "react";
import {
  Divider,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Card,
  Modal,
  Col,
  Row,
  Checkbox,
  Pagination,
} from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import DaumPostCode from "react-daum-postcode";
import { useHistory } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrower,
  isMobile,
} from "react-device-detect";
import HeaderContainer from "../../../../containers/common/HeaderContainer";

function CardInList(props) {
  console.log("카인리");
  console.log(props);
  return (
    <>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Divider />
        <h3>상품정보</h3>
        {/* <BrowserView>
          <div>{renderbox()}</div>
        </BrowserView>
        <MobileView>{mobileBox()}</MobileView> */}

        <Divider />
        <div></div>
      </div>
    </>
  );
}

export default CardInList;
