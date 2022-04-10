import { useEffect, useState, useScript } from "react";
import React from "react";
import {
  Divider,
  Form,
  Input,
  Button,
  InputNumber,
  Radio,
  Select,
  Card,
  Modal,
  Col,
  Row,
  Table,
  Menu,
  Checkbox,
  Pagination,
  Space,
} from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import DaumPostCode from "react-daum-postcode";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import produce from "immer";

import {
  BrowserView,
  MobileView,
  isBrower,
  isMobile,
} from "react-device-detect";
import HeaderContainer from "../../../../containers/common/HeaderContainer";
import axios from "../../../../api/axiosDefaults";
import { setWeekYear } from "date-fns";
import { options } from "../../../../../node_modules/jest-runtime/build/cli/args";
function CardInRefundFinish(props) {
  const [reFundList, SetRefundList] = useState([]);
  //console.log("카인리");
  //console.log(props);
  //최종환불금액
  const [finalRefundM, setFinalRefundM] = useState(0);
  const onChangeFinal = (e) => {
    setFinalRefundM(e);
  };
  const [refundData, SetRefundData] = useState();
  useEffect(() => {
    const body = {
      uoid: props.situationDetail.detailId,
    };
    axios.post("/api/readRefundRequest", body).then((response) => {
      //console.log("레스폰스");
      //console.log(response);
      if (response.data.success) {
        //console.log("이거 리펀드요청임");
        SetRefundData(response.data);
        response.data.refundListList.map((data, idx) => {
          //console.log("데이터확인");
          const info = {
            idx: idx,
            key: data.orderDetailId,
            odid: data.orderDetailId,
            originOrder: data.orderCount,
            refundOrder: data.refundCount,
            refundConfrimOrder: 0,
            individualPrice: data.optionIndividualPrice,
            issale: data.panda,
            expectMoney: 0,
          };
          //console.log(info);
          SetRefundList((reFundList) => [...reFundList, info]);
          // SetRefundList(
          //   produce(reFundList, (draft) => {
          //     //console.log("셋팅즈");
          //     draft.array.push(info);

          //     //console.log(reFundList);
          //   })
          // );
        });
        //console.log(response.data);
      }
    });
  }, [props]);
  const cancelRequest = () => {
    const body = {
      userOrderId: props.situationDetail.detailId,
      refundId: refundData.requestId,
      refundArray: reFundList,
      refundMoney: expectMoney,
    };
    //console.log(body);
    axios.post("/api/confirmtrade", body).then((response) => {
      if (response.data.success) {
        alert("거절에 성공했습니다");
        window.location.reload();
      } else {
        alert("거절에 실패했습니다");
      }
    });
  };

  const confirmTrade = () => {
    //console.log("교환/환불거절");
    // //console.log(finalRefundM);
    // if (expectMoney < finalRefundM) {
    //   alert("전체 상품금액보다 큰 금액은 환불할 수 없습니다");
    //   return;
    // }
    if (reFundList === null) {
      alert(
        "목록이 비었다면 교환이 진행되지 않습니다 교환처리 버튼을 이용해주세요"
      );
      return;
    }

    const body = {
      userOrderId: props.situationDetail.detailId,
      refundId: refundData.requestId,
      refundArray: reFundList,
      refundMoney: expectMoney,
    };
    //console.log(body);
    axios.post("/api/confirmtrade", body).then((response) => {
      if (response.data.success) {
        alert("교환요청처리에 성공했습니다");
        window.location.reload();
      } else {
        alert("교환요청처리에 실패했습니다");
      }
    });
  };
  const confirmReqRefund = (reqnum) => {
    //console.log("환불신청확인");
    //console.log(refundData);
    //console.log(reFundList);
    //console.log(expectMoney);
    // //console.log(finalRefundM);
    // if (expectMoney < finalRefundM) {
    //   alert("전체 상품금액보다 큰 금액은 환불할 수 없습니다");
    //   return;
    // }
    if (reFundList === null || expectMoney === 0) {
      alert(
        "목록이 비었거나 금액이 0원 이라면환불이 진행되지 않습니다 교환처리 버튼을 이용해주세요"
      );
      return;
    }

    const body = {
      userOrderId: props.situationDetail.detailId,
      refundId: refundData.requestId,
      refundArray: reFundList,
      refundMoney: expectMoney,
    };
    //console.log("환불신청바디", body);
    axios.post("/api/confirmRefundRequest", body).then((response) => {
      if (response.data.success) {
        alert("환불요청처리에 성공했습니다");
        window.location.reload();
      } else {
        alert("환불요청처리에 실패했습니다");
      }
    });
  };

  const renderRefund = () => {
    return (
      <>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          <h1>환불/교환신청내역</h1>
        </div>
        <div>
          <div>환불신청사유</div>
          {refundData && <div>{refundData.refundMessage}</div>}
        </div>
        {/* {//console.log(refundData)} */}
        {refundData &&
          refundData.refundListList.map((rr, idx) => {
            return (
              <>
                <div
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid black",
                  }}
                >
                  <Row align={"middle"} gutter={24}>
                    <Col
                      span={24}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <h1>상품명/옵션명</h1>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {rr.productName}/{rr.optionName}
                    </Col>
                    <Col
                      span={24}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div>
                        주문갯수: {rr.orderCount} | 환불/교환 신청 :
                        {rr.refundCount}
                      </div>
                    </Col>
                    <Col
                      span={24}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <div>
                        최종환불/교환 갯수 :
                        <InputNumber
                          onChange={onChange(rr.orderDetailId)}
                          max={rr.orderCount}
                          min={0}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
                <br></br>
              </>
            );
          })}
        <Row gutter={24}>
          <Col span={24}>
            선택상품금액:
            {expectMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Col>
          {/* <Col span={24}>
            환불금액:
            <InputNumber onChange={onChangeFinal} min={0} max={expectMoney} />
          </Col> */}
          <br />
          <br />

          <Col span={24}>
            <div>환불처리 안내사항</div>
            <div>
              가. 환불은 상품 갯수에 기반해서 정산됩니다.
              <br />
              나. 상품 홍보인 (판다)가 있을경우 전체금액에서 판다에게 지급될
              돈을 뺀 금액보다 많은 금액을 환불할 수 없습니다. 환불 갯수를 꼭
              확인해 주세요
              <br />
              다. 교환,반품에 소요되는 비용은 소비자와 협의후 다른 방법으로
              청구하시기를 권장드립니다. 판매자의 실수로 인한 잘못된 청구는
              되돌릴 수 없습니다.
              <br />
              라. 환불 요청 이후 되돌릴수 없으므로 유의해 주시기 바랍니다.
            </div>
            <Button
              onClick={() => {
                confirmReqRefund(props.detailId);
              }}
              style={{ width: "100%" }}
            >
              환불처리완료
            </Button>
          </Col>

          <Col span={24}>
            <br />
            <div>교환처리 안내사항</div>
            <br />
            교환 처리는 금액의 환불없이 상품만이 오고 갔을 경우이며 금액의
            차감이 없습니다 교환,반품비는 소비자와 협의후 다른 방법으로
            청구받으시기 바랍니다.
            <Button
              onClick={() => {
                confirmTrade(props.detailId);
              }}
              style={{ width: "100%" }}
            >
              교환처리완료
            </Button>
          </Col>

          <Col span={24}>
            <br />
            <div>환불/교환거절 안내사항</div>
            <br />
            환불/교환은 소비자보호법을 우선합니다.
            <Button
              onClick={() => {
                cancelRequest(props.detailId);
              }}
              style={{ width: "100%" }}
            >
              환불거절
            </Button>
          </Col>
        </Row>
      </>
    );
  };
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
  const { SubMenu } = Menu;

  const { TextArea } = Input;
  const [refundText, setRefundText] = useState("환불요청메시지");
  const onTestPandaDashboard = () => {
    const body = {
      startDay: new Date(),
      endDay: new Date(),
      status: "지급예정",
    };
    axios.post("/api/pandadashboard", body).then((response) => {
      if (response.data.success) {
        //console.log("스테이터스변경성공");
        //console.log(response.data);
      } else {
        //console.log("스테이터스실패");
        //console.log(response.data);
      }
    });
  };

  // const onTestCheck = (p, s, c, w) => {
  //   //console.log(p + s);
  //   const body = {
  //     userOrderId: p,
  //     state: s,
  //     //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
  //     courier: c,
  //     waybill: w,
  //   };
  //   axios.post("/api/editstatus", body).then((response) => {
  //     if (response.data.success) {
  //       //console.log("스테이터스변경성공");
  //     } else {
  //       //console.log("스테이터스실패");
  //     }
  //   });
  // };
  const onRefundOrder = (p) => {
    if (
      window.confirm(
        "상세 반품/취소 사항은 상품 판매자와 연락해주세요. 반품신청을 계속하시겠습니까?"
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
  const [nextOPKey, setOPKey] = useState(0);
  // const [options, setOptions] = useState([]);
  const options = [];

  const [expectMoney, setExpectMoney] = useState(0);
  function moneyCalculater() {
    //console.log("머니칼큘레이터 실행");
    let money = 0;
    reFundList.forEach((el) => {
      //console.log(el.issale);
      if (el.issale) {
        money += Math.floor(el.individualPrice * el.refundConfrimOrder);
      } else {
        money += el.individualPrice * el.refundConfrimOrder;
      }
      setExpectMoney(money);
    });
  }
  const onChange = (title, key) => (event) => {
    //console.log("체인지키");
    //console.log(title);
    //console.log(key);
    //console.log(event);
    reFundList.findIndex((x) => {
      if (x.key == title) {
        x.refundConfrimOrder = event;
        moneyCalculater();
      }
    });

    // setOpList(
    //   produce(Oplist, (draft) => {
    //     let price =
    //       event * Oplist.array.find((x) => x.key == key.key).originPrice;
    //     //할인로직
    //     // if (Oplist.array.find((x) => x.key == key.key).ispanda) {
    //     //   price = Math.round(price * 0.95);
    //     // }
    //     draft.array.find((x) => x.key == key.key).optionCount = event;
    //     draft.array.find((x) => x.key == key.key).optionPrice = price
    //       .toString()
    //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   })
    // );
  };
  // const onDelete = (title, key) => (event) => {
  //   // Oplist.array.find((x, id) => {
  //   //   //console.log("파인드키");
  //   //   //console.log(x.optionId);
  //   //   if (x.optionId == key.optionId) {
  //   //     setOpList(
  //   //       produce(Oplist, (draft) => {
  //   //         draft.array.splice(id, 1);
  //   //       })
  //   //     );
  //   //   }
  //   // });
  // };
  // const handleClick = (e) => {
  //   //console.log("ops");
  //   //console.log(e.item.props);

  //   //console.log(options);
  //   if (Oplist.array.find((x) => x.optionId == e.key) !== undefined) {
  //     alert("이미 존재하는 상품입니다");
  //     return;
  //   } else {
  //     //console.log("옾션즈");
  //     //console.log(e);
  //     const info = {
  //       key: nextOPKey,
  //       optionId: e.item.props.inherenceKey,
  //       optionCount: 1,
  //       optionName: e.item.props.optionname,
  //       optionPrice: e.item.props.optionPrice
  //         .toString()
  //         .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //       originPrice: e.item.props.optionPrice,
  //       max: e.item.props.quantity,
  //       ispanda: e.item.props.ispanda,
  //     };

  //     setOpList(
  //       produce(Oplist, (draft) => {
  //         draft.array.push(info);
  //         setOPKey(nextOPKey + 1);
  //       })
  //     );
  //   }
  // };

  // const columns = [
  //   {
  //     title: "상품명",
  //     dataIndex: "optionName",
  //     key: "optionName",
  //     width: "40%",
  //   },
  //   {
  //     title: "수량",
  //     dataIndex: "optionCount",
  //     key: "optionCount",
  //     width: "5%",

  //     render: (title, key) => (
  //       <>
  //         {//console.log(key)}
  //         <InputNumber
  //           min={1}
  //           max={key.max}
  //           defaultValue={1}
  //           onChange={onChange(title, key)}
  //           size="small"
  //         />
  //       </>
  //     ),
  //   },
  //   {
  //     title: "가격/원",
  //     dataIndex: "optionPrice",
  //     key: "optionPrice",
  //     width: "30%",
  //   },

  //   {
  //     title: "삭제",
  //     key: "action",
  //     width: "20%",

  //     render: (title, key) => (
  //       <Space size="middle">
  //         <Button onClick={onDelete(title, key)}>Delete</Button>
  //       </Space>
  //     ),
  //   },
  // ];
  const renderOption =
    props &&
    props.situationDetail.products.map((pd, idx) => {
      return (
        <>
          {pd.options.map((op, idxo) => {
            options.push(op);
            let price = op.optionPrice;
            if (op.discount) {
              price = Math.floor(price);
            }
            return (
              <Menu.Item
                padnaname={op.pandaName}
                optionname={op.optionName}
                optionPrice={price}
                quantity={op.optionCount}
                isdiscount={op.discount}
                inherenceKey={op.odid}
                ispanda={op.discount}
                key={op.odid}
              >
                {" "}
                <div style={{ float: "left" }}>{op.optionName}</div>
                <div style={{ float: "right" }}>
                  {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </div>
              </Menu.Item>
            );
            // Oplist.push(op);
          })}
        </>
      );
    });
  const column = [];
  const renderbox = () => {
    return (
      <>
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

  return (
    <>
      <div style={{ width: "85%", margin: "3rem auto" }}>
        <Divider />
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
        <div>{renderRefund()}</div>
      </div>
    </>
  );
}

export default CardInRefundFinish;
