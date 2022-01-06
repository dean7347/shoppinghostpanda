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
  var freePrice = props.situationDetail.freeprice;
  var shipPrice = props.situationDetail.shipprice;
  function isfree(getpurePrice) {
    if (getpurePrice >= freePrice) {
      return "무료배송";
    } else {
      return shipPrice;
    }
  }
  //렌더박스
  const renderbox = () => {
    return (
      <>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {/* 헤더 영역 */}
          <Row>
            <Col lg={5} md={12} sm={12} xs={12}>
              <div style={{}}>상품</div>
            </Col>
            <Col lg={10} md={12} sm={12} xs={12}>
              <div style={{}}>상품상세</div>
            </Col>
            <Col lg={5} md={12} sm={12} xs={12}>
              <div style={{}}>상품금액</div>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12}>
              <div style={{}}>배송비</div>
            </Col>
          </Row>
        </div>
        {/* 바디영역 */}

        {props &&
          props.situationDetail.products.map((pd, idx) => {
            var allPrice = 0;
            var purePrice = 0;
            function pricePlus(getprice, getpureprice) {
              allPrice = allPrice + getprice;
              purePrice = purePrice + getpureprice;
            }

            return (
              <div style={{ alignItems: "center", justifyContent: "center" }}>
                <Row align={"middle"}>
                  <Col lg={24} md={24} sm={24} xs={24}>
                    <Row align={"middle"}>
                      <Col
                        span={24}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <img
                          style={{
                            width: "150px",
                            height: "150px",
                          }}
                          alt="product"
                          src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${pd.imgPath}`}
                        />
                      </Col>
                      <Col
                        span={24}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {pd.productName}
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    span={24}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {pd.options.map((option, index) => (
                      <>
                        <div style={{ background: "#FFDBC1" }}>
                          {option.pandaName}/{option.optionName}/
                          {option.optionCount}개*(
                          {option.optionPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원)
                          <div style={{ background: "#FFEAD0" }}>
                            <Row>
                              <Col span={24}>
                                {option.discount ? (
                                  <div>
                                    {Math.round(
                                      option.optionPrice *
                                        option.optionCount *
                                        0.95
                                    )
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    <br />
                                    (판다 할인 : 5% )
                                  </div>
                                ) : (
                                  <div>
                                    {(option.optionPrice * option.optionCount)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    <br />
                                    (판다 할인 미적용)
                                  </div>
                                )}
                              </Col>
                            </Row>
                          </div>
                        </div>
                        <br />
                      </>
                    ))}
                  </Col>
                </Row>
              </div>
            );
          })}

        {/* 바디영역 끝 */}

        <div className="col-12">
          <div className="card order-card">
            <hr className="cart-hr" />
            <div className="row order_calculator">
              <dl className="col-5">
                <dt>총 상품 금액</dt>
                <dd>
                  <span>
                    {props.situationDetail.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </dd>
              </dl>
              <dl className="col-2">
                <i className="bx bx-plus-circle"></i>
              </dl>
              <dl className="col-5">
                <dt>배송비</dt>
                <dd>{isfree(props.situationDetail.price)}</dd>
              </dl>
              <dl className="col-1">
                <i className="bx bx-chevron-right"></i>
              </dl>
              <dl className="col-4">
                <dt>총 주문 금액</dt>
                <dd>
                  <span>
                    {props.situationDetail.allamount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </dd>
              </dl>
            </div>
            <hr className="cart-hr" />
          </div>
        </div>
      </>
    );
  };
  //렌더박스

  return (
    <>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Divider />
        <h3>상품정보</h3>
        {renderbox()}

        <Divider />
        <div></div>
      </div>
    </>
  );
}

export default CardInList;
