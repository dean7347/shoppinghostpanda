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
import axios from "../../../../../node_modules/axios/index";
import { setWeekYear } from "date-fns";
import { options } from "../../../../../node_modules/jest-runtime/build/cli/args";
function CardInList(props) {
  console.log("카인리");
  console.log(props);
  var freePrice = props.situationDetail.freeprice;
  var shipPrice = props.situationDetail.shipprice;
  const onCancelOrder = (p) => {
    console.log("취소신청");
    console.log(p);
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
        console.log("스테이터스변경성공");
        console.log(response.data);
      } else {
        console.log("스테이터스실패");
        console.log(response.data);
      }
    });
  };
  const onRefund = (id) => {
    console.log(id + "환불요청");
    // console.log("환불쓰")
    console.log(refundText);
    console.log(Oplist);
    console.log(options);
    // const body = {
    //   userOrderId: id,
    //   state: "환불신청",
    //   courier: refundText,
    //   waybill: "",
    // };
    // axios.post("/api/editstatus", body).then((response) => {
    //   if (response.data.success) {
    //     alert("환불요청을 완료했습니다");
    //   } else {
    //     alert(response.data.message);
    //   }
    // });
  };

  const onTestCheck = (p, s, c, w) => {
    console.log(p + s);
    const body = {
      userOrderId: p,
      state: s,
      //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
      courier: c,
      waybill: w,
    };
    axios.post("/api/editstatus", body).then((response) => {
      if (response.data.success) {
        console.log("스테이터스변경성공");
      } else {
        console.log("스테이터스실패");
      }
    });
  };
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
      console.log("취소");
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
  const [Oplist, setOpList] = useState({
    array: [],
  });
  const onChange = (title, key) => (event) => {
    setOpList(
      produce(Oplist, (draft) => {
        let price =
          event * Oplist.array.find((x) => x.key == key.key).originPrice;
        draft.array.find((x) => x.key == key.key).optionCount = event;
        draft.array.find((x) => x.key == key.key).optionPrice = price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      })
    );
  };
  const onDelete = (title, key) => (event) => {
    setOpList(
      produce(Oplist, (draft) => {
        draft.array.splice(
          draft.array.find((x) => x.key == key.key),
          1
        );
      })
    );
  };
  const handleClick = (e) => {
    console.log("ops");
    console.log(e.key);

    console.log(options);
    if (
      Oplist.array.find((x) => x.optionId == options[e.key].odid) !== undefined
    ) {
      alert("이미 존재하는 상품입니다");
      return;
    } else {
      console.log("프롭");
      console.log(e.item.props);
      console.log("--프롭");

      const info = {
        key: nextOPKey,
        optionId: e.item.props.inherenceKey,
        optionCount: 1,
        optionName: e.item.props.optionname,
        optionPrice: e.item.props.optionPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        originPrice: e.item.props.optionPrice,
      };

      setOpList(
        produce(Oplist, (draft) => {
          draft.array.push(info);
          setOPKey(nextOPKey + 1);
        })
      );
    }
  };

  const columns = [
    {
      title: "상품명",
      dataIndex: "optionName",
      key: "optionName",
      width: "40%",
    },
    {
      title: "수량",
      dataIndex: "optionCount",
      key: "optionCount",
      width: "5%",

      render: (title, key) => (
        <>
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={onChange(title, key)}
            size="small"
          />
        </>
      ),
    },
    {
      title: "가격/원",
      dataIndex: "optionPrice",
      key: "optionPrice",
      width: "30%",
    },

    {
      title: "삭제",
      key: "action",
      width: "20%",

      render: (title, key) => (
        <Space size="middle">
          <Button onClick={onDelete(title, key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const renderOption =
    props &&
    props.situationDetail.products.map((pd, idx) => {
      return (
        <>
          {pd.options.map((op, idxo) => {
            options.push(op);
            console.log("정상동작");
            console.log(op);

            return (
              <Menu.Item
                padnaname={op.pandaName}
                optionname={op.optionName}
                optionPrice={op.optionPrice}
                quantity={op.optionCount}
                optionPrice={op.optionPrice}
                isdiscount={op.discount}
                inherenceKey={op.odid}
                key={idxo}
              >
                {" "}
                <div style={{ float: "left" }}>{op.optionName}</div>
                <div style={{ float: "right" }}>
                  {op.optionPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                        {column.push(option)}
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
                              <Col span={12}>{option.orderStatus}</Col>

                              <Col span={12}>
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
          {/* <div>
            ***임시버튼***
            <Button
              onClick={() =>
                onTestCheck(props.situationDetail.detailId, "준비중", "c", 123)
              }
            >
              스테이트 준비중으로 변경
            </Button>
            <Button
              onClick={() =>
                onTestCheck(props.situationDetail.detailId, "발송중", "c", 123)
              }
            >
              스테이트 발송중으로 변경
            </Button>
            <Button
              onClick={() =>
                onTestCheck(
                  props.situationDetail.detailId,
                  "구매확정",
                  "c",
                  123
                )
              }
            >
              스테이트 구매확정 변경
            </Button>
            <Button onClick={() => onTestPandaDashboard()}>
              판다대시보드테스트
            </Button>
          </div> */}
        </Row>
        {renderbox()}
        <div>
          <hr />
          <Row gutter={24}>
            <Col span={12}>환불/교환</Col>
            <Col span={24}>
              <TextArea
                placeholder="사유와 품목을 입력해주세요"
                onChange={(e) => setRefundText(e.target.value)}
                rows={4}
              />
            </Col>
            <Col span={17}></Col>
            <Row gutter={[16, 16]}>
              <Table
                columns={columns}
                dataSource={Oplist.array}
                pagination={false}
              />
              <Menu
                onSelect={handleClick}
                style={{ width: "100%" }}
                defaultSelectedKeys={["1"]}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  // icon={<DatabaseOutlined />}
                  title="옵션을 선택해주세요"
                >
                  {renderOption}
                </SubMenu>
              </Menu>
            </Row>
            <Col span={4} justify={"end"}>
              <Button onClick={() => onRefund(props.situationDetail.detailId)}>
                환불/교환 요청
              </Button>
            </Col>
          </Row>
        </div>

        <Divider />
        <div></div>
      </div>
    </>
  );
}

export default CardInList;
