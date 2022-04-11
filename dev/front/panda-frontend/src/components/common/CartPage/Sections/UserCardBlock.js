import React, { useState, useEffect } from "react";

import "./UserCardBlock.css";
import { Button, Checkbox, Divider, Modal, Row, Col } from "antd";
import axios from "../../../../api/axiosDefaults";
import ProductInfo from "../../../../components/sections/ProductInfoFloat";
import Button2 from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrower,
  isMobile,
} from "react-device-detect";
function UserCardBlock(props) {
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [];
  const defaultCheckedList = [];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  //console.log("프롭스!!");
  //console.log(props);

  useEffect(() => {
    setCheckedList(defaultCheckedList);
  }, [props]);
  const onChanges = (e, mo) => {
    // //console.log(`checked = ${e.target.checked}`);
    // //console.log(mo);
  };
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onClick = (params, e) => {
    // //console.log(params); // error
    e.preventDefault();
    const body = {
      orderDetailId: params,
    };

    axios.post("/api/cart/removeoption", body).then((response) => {
      if (response.data.success) {
        alert("선택된 옵션을 삭제했습니다");
        window.location.reload();
      } else {
        alert("옵션 삭제에 실패했습니다");
      }
    });
    // do someting...
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalProduct, setModalProduct] = useState("");
  const [modalOrder, setModalOrder] = useState("");

  const [selectOption, setSelectOption] = useState({});
  const showModal = (params, item, e) => {
    setIsModalVisible(true);
    setSelectOption(params.do);

    setModalProduct(params.productId);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  const handleSelectDelete = () => {
    const set = new Set(checkedList);
    const uniqueArr = [...set];
    // //console.log(uniqueArr);
    props.products.ds.map((de, index) => {
      if (uniqueArr.includes(de.shopId)) {
        //console.log("포함");
        //console.log(de);

        de.dp.map((deleteOption, index) => {
          deleteOption.do.map((deleteThis, index) => {
            const body = {
              orderDetailId: deleteThis.detailedId,
            };

            axios.post("/api/cart/removeoption", body).then((response) => {
              if (response.data.success) {
                window.location.reload();
              } else {
                alert("옵션 삭제에 실패했습니다");
              }
            });
          });
        });
        alert("삭제가 완료되었습니다");
      } else {
        //console.log("불포함");
      }
    });
  };

  const renderbox = () => {
    return (
      <>
        <BrowserView>
          <div>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              전체선택
            </Checkbox>
            <Button onClick={handleSelectDelete}>선택상품 삭제</Button>
            <Divider />
          </div>
          {props.products.ds &&
            props.products.ds.map((item, index) => {
              plainOptions.push(item.shopId);
              defaultCheckedList.push(item.shopId);
            })}

          <CheckboxGroup
            //   defaultValue={() => plainOptions}
            value={checkedList}
            onChange={onChange}
            style={{ width: "100%" }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {/* 헤더 영역 */}
              <Row>
                <Col lg={6} md={12} sm={12} xs={12}>
                  <div style={{}}>상점명</div>
                </Col>
                <Col lg={10} md={12} sm={12} xs={12}>
                  <div style={{}}>상품상세</div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                  <div style={{}}>상품금액</div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                  <div style={{}}>배송비</div>
                </Col>
              </Row>
            </div>
            {/* 바디영역 */}

            <div>
              {/* {//console.log("프롭스확인")} */}

              {/* {//console.log(props)} */}
              {props.products.ds &&
                props.products.ds.map((item, index) => {
                  var allPrice = 0;
                  var purePrice = 0;
                  function pricePlus(getprice, getpureprice) {
                    allPrice = allPrice + getprice;
                    purePrice = purePrice + getpureprice;
                  }

                  var freePrice = item.freePrice;
                  var shipPrice = item.shipPrice;
                  function isfree(getpurePrice) {
                    if (getpurePrice >= freePrice) {
                      return "무료배송";
                    } else {
                      return shipPrice;
                    }
                  }
                  return (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Row align={"middle"} style={{}}>
                          <Col lg={4} md={12} sm={12} xs={4}>
                            {item.shopName}{" "}
                            <Checkbox
                              onChange={(e) => onChanges(e, allPrice)}
                              value={item.shopId}
                            ></Checkbox>
                            {item.dp.map((product, index) => (
                              <>
                                <div>{product.proId}</div>
                              </>
                            ))}
                          </Col>
                          <Col lg={12} md={12} sm={12} xs={20}>
                            <div style={{}}>
                              {item.dp.map((product, index) => (
                                <>
                                  {/* 상품상세박스 */}
                                  <Row align={"middle"}>
                                    <Col lg={6} md={6} sm={12} xs={12}>
                                      <Row>
                                        <Col span={24}>
                                          <img
                                            style={{
                                              width: "150px",
                                              height: "150px",
                                            }}
                                            alt="product"
                                            src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${product.thumbNail}`}
                                          />
                                        </Col>
                                        <Col span={24}>
                                          <Link
                                            to={`/product/${product.productId}`}
                                          >
                                            {product.productName}
                                          </Link>
                                        </Col>
                                        <Col span={24}>
                                          <Button
                                            type="primary"
                                            onClick={(e) => {
                                              showModal(product, props, e);
                                            }}
                                          >
                                            변경
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col span={18}>
                                      {product.do.map((option, index) => (
                                        <>
                                          <div
                                            style={{ background: "#FFDBC1" }}
                                          >
                                            {option.pandaName}/
                                            {option.optionName}/
                                            {option.optionCount}개*(
                                            {option.originPrice
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )}
                                            원)
                                            {option.discount
                                              ? pricePlus(
                                                  Math.floor(
                                                    option.originPrice * 0.95
                                                  ) * option.optionCount,
                                                  option.originPrice *
                                                    option.optionCount
                                                )
                                              : pricePlus(
                                                  option.originPrice *
                                                    option.optionCount,
                                                  option.originPrice *
                                                    option.optionCount
                                                )}
                                            <div
                                              style={{ background: "#FFEAD0" }}
                                            >
                                              <Row>
                                                <Col span={16}>
                                                  {option.discount ? (
                                                    <div>
                                                      {Math.floor(
                                                        option.originPrice *
                                                          0.95
                                                      ) *
                                                        option.optionCount

                                                          .toString()
                                                          .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                          )}
                                                      <br />
                                                      (판다 할인 : 5% )
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      {(
                                                        option.originPrice *
                                                        option.optionCount
                                                      )
                                                        .toString()
                                                        .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ","
                                                        )}
                                                      <br />
                                                      (판다 할인 미적용)
                                                    </div>
                                                  )}
                                                </Col>
                                                <Col span={4}>
                                                  {" "}
                                                  <Button
                                                    type="primary"
                                                    danger
                                                    onClick={(e) => {
                                                      onClick(
                                                        option.detailedId,
                                                        e
                                                      );
                                                    }}
                                                  >
                                                    삭제
                                                  </Button>
                                                </Col>
                                              </Row>
                                            </div>
                                          </div>
                                          <br />
                                        </>
                                      ))}
                                    </Col>
                                  </Row>
                                </>
                              ))}
                            </div>
                          </Col>
                          <Col lg={4} md={12} sm={12} xs={12}>
                            최종가격 :{" "}
                            {allPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            <br />
                            할인전 : (
                            {purePrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            )
                          </Col>
                          <Col lg={4} md={12} sm={12} xs={12}>
                            <div style={{}}>
                              {isfree(purePrice)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              <br />(
                              {freePrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              이상 무료배송)
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr style={{ backgroundColor: "red" }} />
                    </>
                  ); //return
                })}
            </div>
          </CheckboxGroup>

          <div className="col-12">
            <div className="card order-card">
              <hr className="cart-hr" />
              <div className="row order_calculator">
                <dl className="col-2">
                  <dt>총 상품 금액</dt>
                  <dd>
                    <span>
                      {calculateTotla()
                        .total.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
                <dl className="col-1">
                  <i className="bx bx-plus-circle"></i>
                </dl>
                <dl className="col-2">
                  <dt>배송비</dt>
                  <dd>
                    <span>
                      {calculateTotla()
                        .ship.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
                <dl className="col-1">
                  <i className="bx bx-chevron-right"></i>
                </dl>
                <dl className="col-4">
                  <dt>총 주문 금액</dt>
                  <dd>
                    <span>
                      {(calculateTotla().total + calculateTotla().ship)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
              </div>
              <hr className="cart-hr" />
            </div>
          </div>
        </BrowserView>

        <MobileView>
          <div>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              전체선택
            </Checkbox>
            <Button onClick={handleSelectDelete}>선택상품 삭제</Button>
            <Divider />
          </div>
          {props.products.ds &&
            props.products.ds.map((item, index) => {
              plainOptions.push(item.shopId);
              defaultCheckedList.push(item.shopId);
            })}

          <CheckboxGroup
            //   defaultValue={() => plainOptions}
            value={checkedList}
            onChange={onChange}
            style={{ width: "100%" }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {/* 헤더 영역 */}
              <Row>
                <Col lg={6} md={12} sm={12} xs={12}>
                  <div style={{}}>상점명</div>
                </Col>
                <Col lg={10} md={12} sm={12} xs={12}>
                  <div style={{}}>상품상세</div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                  <div style={{}}>상품금액</div>
                </Col>
                <Col lg={4} md={12} sm={12} xs={12}>
                  <div style={{}}>배송비</div>
                </Col>
              </Row>
            </div>
            {/* 바디영역 */}

            <div>
              {/* {//console.log("프롭스확인")} */}

              {/* {//console.log(props)} */}
              {props.products.ds &&
                props.products.ds.map((item, index) => {
                  var allPrice = 0;
                  var purePrice = 0;
                  function pricePlus(getprice, getpureprice) {
                    allPrice = allPrice + getprice;
                    purePrice = purePrice + getpureprice;
                  }

                  var freePrice = item.freePrice;
                  var shipPrice = item.shipPrice;
                  function isfree(getpurePrice) {
                    if (getpurePrice >= freePrice) {
                      return "무료배송";
                    } else {
                      return shipPrice;
                    }
                  }
                  return (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",

                          width: "100%",
                        }}
                      >
                        <Row align={"middle"} style={{ width: "100%" }}>
                          <Col lg={4} md={12} sm={12} xs={24}>
                            {item.shopName}{" "}
                            <Checkbox
                              onChange={(e) => onChanges(e, allPrice)}
                              value={item.shopId}
                            ></Checkbox>
                            {item.dp.map((product, index) => (
                              <>
                                <div>{product.proId}</div>
                              </>
                            ))}
                          </Col>
                          <Col
                            style={{ width: "100%" }}
                            lg={12}
                            md={12}
                            sm={12}
                            xs={24}
                          >
                            <div
                              style={{
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {item.dp.map((product, index) => (
                                <>
                                  {/* 상품상세박스 */}
                                  <Row align={"middle"}>
                                    <Col lg={6} md={6} sm={12} xs={24}>
                                      <Row>
                                        <Col span={24}>
                                          <img
                                            style={{
                                              width: "150px",
                                              height: "150px",
                                            }}
                                            alt="product"
                                            src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${product.thumbNail}`}
                                          />
                                        </Col>
                                        <Col span={24}>
                                          <Link
                                            to={`/product/${product.productId}`}
                                          >
                                            {product.productName}
                                          </Link>
                                        </Col>
                                        <Col span={24}>
                                          <Button
                                            type="primary"
                                            onClick={(e) => {
                                              showModal(product, props, e);
                                            }}
                                          >
                                            변경
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Col>
                                    <Col span={24}>
                                      {product.do.map((option, index) => (
                                        <>
                                          <div
                                            style={{ background: "#FFDBC1" }}
                                          >
                                            {option.pandaName}/
                                            {option.optionName}/
                                            {option.optionCount}개*(
                                            {option.originPrice
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )}
                                            원)
                                            {option.discount
                                              ? pricePlus(
                                                  Math.floor(
                                                    option.originPrice * 0.95
                                                  ) * option.optionCount,
                                                  option.originPrice *
                                                    option.optionCount
                                                )
                                              : pricePlus(
                                                  option.originPrice *
                                                    option.optionCount,
                                                  option.originPrice *
                                                    option.optionCount
                                                )}
                                            <div
                                              style={{ background: "#FFEAD0" }}
                                            >
                                              <Row>
                                                <Col span={16}>
                                                  {option.discount ? (
                                                    <div>
                                                      {Math.floor(
                                                        option.originPrice *
                                                          0.95
                                                      ) *
                                                        option.optionCount
                                                          .toString()
                                                          .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            ","
                                                          )}
                                                      <br />
                                                      (판다 할인 : 5% )
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      {(
                                                        option.originPrice *
                                                        option.optionCount
                                                      )
                                                        .toString()
                                                        .replace(
                                                          /\B(?=(\d{3})+(?!\d))/g,
                                                          ","
                                                        )}
                                                      <br />
                                                      (판다 할인 미적용)
                                                    </div>
                                                  )}
                                                </Col>
                                                <Col span={4}>
                                                  {" "}
                                                  <Button
                                                    type="primary"
                                                    danger
                                                    onClick={(e) => {
                                                      onClick(
                                                        option.detailedId,
                                                        e
                                                      );
                                                    }}
                                                  >
                                                    삭제
                                                  </Button>
                                                </Col>
                                              </Row>
                                            </div>
                                          </div>
                                          <br />
                                        </>
                                      ))}
                                    </Col>
                                  </Row>
                                </>
                              ))}
                            </div>
                          </Col>
                          <Col lg={4} md={12} sm={12} xs={12}>
                            최종가격 : {allPrice}
                            <br />
                            할인전 : ({purePrice})
                          </Col>
                          <Col lg={4} md={12} sm={12} xs={12}>
                            <div style={{}}>
                              {isfree(purePrice)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              <br />(
                              {freePrice
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              이상 무료배송)
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <hr style={{ backgroundColor: "red" }} />
                    </>
                  ); //return
                })}
            </div>
          </CheckboxGroup>

          <div className="col-12">
            <div className="card order-card">
              <hr className="cart-hr" />
              <div className="row order_calculator">
                <dl className="col-5">
                  <dt> 상품 금액</dt>
                  <dd>
                    <span>
                      {calculateTotla()
                        .total.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
                <dl className="col-5">
                  <i className="bx bx-plus-circle"></i>
                </dl>
                <dl className="col-5">
                  <dt>배송비</dt>
                  <dd>
                    <span>
                      {calculateTotla()
                        .ship.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>

                <dl className="col-5">
                  <i className="bx bx-chevron-right" />
                </dl>
                <dl className="col-8">
                  <dt>총 주문 금액</dt>
                  <dd>
                    <span>
                      {(calculateTotla().total + calculateTotla().ship)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </dd>
                </dl>
              </div>
              <hr className="cart-hr" />
            </div>
          </div>
        </MobileView>
      </>
    );
  };

  let calculateTotla = () => {
    let total = 0;

    let ship = 0;
    let shopPrice = 0;
    props.products.ds &&
      props.products.ds.map((item, index) => {
        shopPrice = 0;
        if (!(checkedList.indexOf(item.shopId) === -1)) {
          // //console.log("들어옴");
          // //console.log(item.shopId);
          item.dp.map((product, index) => {
            product.do.map((options, index) => {
              if (options.pandaName) {
                total +=
                  Math.floor(options.originPrice * 0.95) * options.optionCount;
              } else {
                total += Math.floor(options.originPrice * options.optionCount);
              }
              shopPrice += options.originPrice * options.optionCount;
            });
          });

          if (item.freePrice > shopPrice) {
            ship += item.shipPrice;
          }
        }
      });

    return { total, ship };
  };
  return (
    <div>
      <Modal
        title="상품변경"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        destroyOnClose={"true"}
      >
        <ProductInfo
          proId={modalProduct}
          option={selectOption}
          onCancel={handleCancel}
        />
      </Modal>
      {renderbox()}

      <div style={{ marginTop: "3rem" }}>
        {/* <div style={{ float: "left" }}>
          {" "}
          <h2>
            총 결제금액 :
            {calculateTotla()
              .total.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            (상품금액) +
            {calculateTotla()
              .ship.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            (배송비)
            <br />=
            {(calculateTotla().total + calculateTotla().ship)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            원{" "}
          </h2>
          V2용
          {props.productPrice(
            calculateTotla()
              .total.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          )}
          {props.ship(
            calculateTotla()
              .ship.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          )}
          {props.amount(
            (calculateTotla().total + calculateTotla().ship)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          )}
          {props.total(calculateTotla().total)}
          {props.shippingPrice(calculateTotla().ship)}
          {props.checkList(checkedList)} 
        </div>
         */}

        <div style={{ float: "right" }}>
          <Link
            to={{
              pathname: `/user/payments`,
              state: { amount: calculateTotla(), selectShopId: checkedList },
            }}
          >
            <Button2 variant="success" size="lg">
              결제하기
            </Button2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserCardBlock;
