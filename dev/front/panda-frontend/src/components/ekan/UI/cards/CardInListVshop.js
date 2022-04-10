import { useEffect, useState, useScript, useRef } from "react";
import { useReactToPrint } from "react-to-print";
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
import { Link } from "react-router-dom";

import {
  BrowserView,
  MobileView,
  isBrower,
  isMobile,
} from "react-device-detect";
import HeaderContainer from "../../../../containers/common/HeaderContainer";
import axios from "../../../../api/axiosDefaults";
function CardInListVshop(props) {
  //console.log("카인리");
  //console.log(props);
  var freePrice = props.situationDetail.freeprice;
  var shipPrice = props.situationDetail.shipprice;
  const onCancelOrder = (p) => {
    //console.log("취소신청");
    //console.log(p);
    const body = {
      detailId: p,
    };
    axios.post("/api/userordercancel", body).then((response) => {
      if (response.data.success) {
        alert("해당 옵션을 취소했습니다");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    });
  };

  // const onTestPandaDashboard = () => {
  //   const body = {
  //     startDay: new Date(),
  //     endDay: new Date(),
  //     status: "지급예정",
  //   };
  //   axios.post("/api/pandadashboard", body).then((response) => {
  //     if (response.data.success) {
  //       //console.log("스테이터스변경성공");
  //       //console.log(response.data);
  //     } else {
  //       //console.log("스테이터스실패");
  //       //console.log(response.data);
  //     }
  //   });
  // };
  const onPrint = () => {
    //console.log("주문서출력");
    window.print();
  };
  const onTestCheck = (p, s, c, w) => {
    //console.log(p + s);
    if (!(s === "준비중" || s === "주문취소")) {
      alert("잘못된 접근입니다!");
      return;
    }
    const body = {
      userOrderId: p,
      state: s,
      //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
      courier: c,
      waybill: w,
    };
    axios.post("/api/editstatus", body).then((response) => {
      if (response.data.success) {
        alert("상태를 변경했습니다");
      } else {
        alert("상태 변경실패");
      }
    });
  };
  const onRefundOrder = (p) => {
    if (
      window.confirm(
        "판매자와 사전 연락이 없었다면 진행에 어려움이 있을수 있습니다. 이에 동의하십니까?"
      )
    ) {
      // axios.post("/api/cart/removeoption", body).then((response) => {
      //   if (response.data.success) {
      //     alert("선택된 옵션을 삭제했습니다");
      //     window.location.reload();
      //   } else {
      //     alert("옵션 삭제에 실패했습니다");
      //   }
      // });
    } else {
      //console.log("취소");
    }
  };
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
            //console.log("pd: ", pd);
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
                        <Link to={`/product/${pd.proId}`}>
                          {pd.productName}
                        </Link>
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
                                    {Math.floor(
                                      option.optionPrice * option.optionCount
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
                              <Col span={12}>환불 갯수 :</Col>

                              <Col span={12}>{option.completeRefund}</Col>
                              <Col span={12}>취소 갯수 :</Col>

                              <Col span={12}>{option.completeCancel}</Col>

                              {/* <Col span={12}>
                                {option.orderStatus !== "결제완료" ? (
                                  <div>
                                    {option.orderStatus === "주문취소" ? (
                                      <div>취소된 주문입니다</div>
                                    ) : (
                                      <div>
                                        {" "}
                                        <Button
                                          onClick={() =>
                                            onRefundOrder(option.odid)
                                          }
                                          danger
                                        >
                                          반품/교환
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </Col> */}
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
                <dd>{isfree(props.situationDetail.originPrice)}</dd>
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
        {props.situationDetail.status === "결제완료" ? (
          <Row justify={"end"}>
            <Col span={6}>
              {" "}
              <Button
                onClick={() => onCancelOrder(props.situationDetail.detailId)}
                danger
              >
                전체 주문 취소
              </Button>
            </Col>
          </Row>
        ) : (
          <div></div>
        )}
      </>
    );
  };
  //렌더박스
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  function test() {
    handlePrint();
  }
  // useEffect(() => {
  //   // document.getElementById("print-button").click();

  //   //console.log("클릭댔음");
  //   //console.log(componentRef);
  //   handlePrint();
  // });

  return (
    <>
      {/* {//console.log("떳다", props.situationDetail)} */}
      {props.situationDetail.status === "구매확정" ? (
        <Button onClick={handlePrint}>인쇄하기</Button>
      ) : (
        <div>
          <Button onClick={handlePrint}>인쇄하기</Button>
          <Button
            onClick={() =>
              onTestCheck(props.situationDetail.detailId, "준비중", "c", 123)
            }
          >
            준비중으로 변경
          </Button>
          <Button
            onClick={() =>
              onTestCheck(props.situationDetail.detailId, "주문취소", "c", 123)
            }
          >
            주문취소
          </Button>
        </div>
      )}
      <div
        id="print-button"
        ref={componentRef}
        style={{ width: "85%", margin: "3rem auto" }}
      >
        <Divider />
        <div ref={componentRef}>
          <div style={{ fontWeight: "bold", fontSize: "25px" }}>
            <h3>상품정보</h3>
            <hr style={{ backgroundColor: "red" }} />
          </div>
          <Row>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>주문자</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.buyerName}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>주문자 전화번호</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.buyerPhone}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>받으시는 분</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.receiver}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>받으시는 분 전화번호</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.receiverPhone}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={24}>
              주소
              <Col span={24}>
                {props.situationDetail.address}
                <hr style={{ backgroundColor: "blue" }} />
              </Col>
            </Col>
            <Col span={24}>
              배송메모
              <Col span={24}>
                {props.situationDetail.shipmemo}
                <hr style={{ backgroundColor: "blue" }} />
              </Col>
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>우편번호</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.addressNum}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>상점 이름</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.shopName}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>상점 번호</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.shopPhone}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>주문 일시</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.orderAt}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                <h3>상품 상태</h3>
              </div>
              <hr style={{ backgroundColor: "black" }} />
            </Col>
            <Col span={12}>
              {props.situationDetail.status}
              <hr style={{ backgroundColor: "blue" }} />
            </Col>
          </Row>

          {renderbox()}

          <Divider />
          <div></div>
        </div>
      </div>
    </>
  );
}

export default CardInListVshop;
