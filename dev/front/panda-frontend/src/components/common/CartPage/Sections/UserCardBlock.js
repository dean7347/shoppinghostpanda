import React, { useState, useEffect } from "react";

import "./UserCardBlock.css";
import { Button, Checkbox, Divider, Modal } from "antd";
import axios from "../../../../../node_modules/axios/index";
import ProductInfo from "../../../../components/sections/ProductInfoFloat";
import Button2 from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrower,
  isMobile,
} from "react-device-detect";
import { set } from "date-fns";

function UserCardBlock(props) {
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [];
  const defaultCheckedList = [];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  console.log("프롭스!!");
  console.log(props);

  useEffect(() => {
    setCheckedList(defaultCheckedList);
  }, [props]);
  const onChanges = (e, mo) => {
    // console.log(`checked = ${e.target.checked}`);
    // console.log(mo);
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
    // console.log(params); // error
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
    // console.log(uniqueArr);
    props.products.ds.map((de, index) => {
      if (uniqueArr.includes(de.shopId)) {
        console.log("포함");
        console.log(de);

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
        console.log("불포함");
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
          >
            {/* <Row gutter={24}>
            <Col span={24}> */}
            <div style={{ width: "100%" }}>
              <table width="100%">
                <thead>
                  <th style={{ fontWeight: "bold", fontSize: "30px" }}>
                    상품상세
                    (썸네일-상점명/상품명-판다명/옵션명/EA/할인전/할인후)
                  </th>
                  <th>상품금액</th>
                  <th>배송비</th>
                  <th>선택</th>
                </thead>
                <tbody>
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
                      //   function getfreePrice(getPrice) {
                      //     freePrice = getPrice;
                      //   }

                      //   function getShipPrice(getPrice) {
                      //     shipPrice = getPrice;
                      //   }
                      function isfree(getpurePrice) {
                        if (getpurePrice >= freePrice) {
                          return "무료배송";
                        } else {
                          return shipPrice;
                        }
                      }
                      return (
                        <tr>
                          <td style={{}}>
                            {item.dp.map((product, index) => (
                              <tr
                                key={index}
                                style={{
                                  borderTop: "0px",
                                  borderLeft: "0px",
                                  borderRight: "0px",
                                }}
                              >
                                <td
                                  style={{
                                    textAlign: "center",
                                    width: "120px",
                                    height: "120px",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "150px",
                                    }}
                                  >
                                    <img
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                      }}
                                      alt="product"
                                      src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${product.thumbNail}`}
                                    />
                                  </div>
                                </td>
                                <td
                                  style={{
                                    verticalAlign: "middle",
                                    textAlign: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "200px",
                                    }}
                                  >
                                    {item.shopName}
                                    <br />
                                    {product.productName}
                                    <br />
                                    <Button
                                      type="primary"
                                      onClick={(e) => {
                                        showModal(product, props, e);
                                      }}
                                    >
                                      변경
                                    </Button>
                                  </div>
                                </td>
                                <td
                                  style={{
                                    width: "50%",
                                    alignItems: "center",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {product.do.map((option, index) => (
                                    <tr
                                      key={index}
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <td
                                        style={{
                                          width: "100%",
                                          borderTop: "0px",
                                          borderLeft: "0px",
                                          borderRight: "0px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "800px",
                                            padding: "10px 0px 10px 10px",
                                          }}
                                        >
                                          <div>
                                            <div>
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
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                              }}
                                            >
                                              {option.discount ? (
                                                <div style={{ width: "150px" }}>
                                                  {Math.round(
                                                    option.originPrice *
                                                      option.optionCount *
                                                      0.95
                                                  )
                                                    .toString()
                                                    .replace(
                                                      /\B(?=(\d{3})+(?!\d))/g,
                                                      ","
                                                    )}
                                                  원
                                                  <br />
                                                  (판다 할인 : 5% )
                                                </div>
                                              ) : (
                                                <div style={{ width: "150px" }}>
                                                  {(
                                                    option.originPrice *
                                                    option.optionCount
                                                  )
                                                    .toString()
                                                    .replace(
                                                      /\B(?=(\d{3})+(?!\d))/g,
                                                      ","
                                                    )}
                                                  원
                                                  <br />
                                                  (판다 할인 미적용)
                                                </div>
                                              )}
                                            </div>
                                            {option.discount
                                              ? pricePlus(
                                                  Math.round(
                                                    option.originPrice *
                                                      option.optionCount *
                                                      0.95
                                                  ),
                                                  option.originPrice *
                                                    option.optionCount
                                                )
                                              : pricePlus(
                                                  option.originPrice *
                                                    option.optionCount,
                                                  option.originPrice *
                                                    option.optionCount
                                                )}
                                          </div>
                                        </div>
                                        <Button
                                          type="primary"
                                          danger
                                          onClick={(e) => {
                                            onClick(option.detailedId, e);
                                          }}
                                        >
                                          삭제
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </td>
                              </tr>
                            ))}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              minWidth: "100px",
                            }}
                          >
                            {allPrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              minWidth: "150px",
                            }}
                          >
                            {isfree(purePrice)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            <br />(
                            {freePrice
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                            이상 무료배송)
                          </td>

                          <td
                            style={{
                              verticalAlign: "middle",
                              minWidth: "100px",
                            }}
                          >
                            <Checkbox
                              onChange={(e) => onChanges(e, allPrice)}
                              value={item.shopId}
                            ></Checkbox>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {/* </Col>
          </Row> */}
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
            <Button>선택상품 삭제</Button>
            <Divider />
          </div>
          {props.products.ds &&
            props.products.ds.map((item, index) => {
              plainOptions.push(item.shopId);
              defaultCheckedList.push(item.shopId);
            })}

          <CheckboxGroup
            //   defaultValue={() => plainOptions}
            style={{ width: "100%" }}
            value={checkedList}
            onChange={onChange}
          >
            {/* <Row gutter={24}>
            <Col span={24}> */}
            <div style={{ width: "100%", display: "block" }}>
              <table
                style={{
                  tableLayout: "fixed",
                  width: "100%",
                  display: "table",
                  minWidth: "100px",
                }}
              >
                <thead>
                  <th>상품상세</th>
                </thead>
                <tbody>
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
                      //   function getfreePrice(getPrice) {
                      //     freePrice = getPrice;
                      //   }

                      //   function getShipPrice(getPrice) {
                      //     shipPrice = getPrice;
                      //   }
                      function isfree(getpurePrice) {
                        if (getpurePrice >= freePrice) {
                          return "무료배송";
                        } else {
                          return shipPrice;
                        }
                      }
                      return (
                        <tr>
                          <td style={{ width: "100%" }}>
                            {item.dp.map((product, index) => (
                              <tr
                                key={index}
                                style={{
                                  width: "100%",
                                  display: "block",
                                }}
                              >
                                <tr
                                  style={{
                                    textAlign: "center",
                                    width: "120px",
                                    height: "120px",
                                  }}
                                >
                                  <img
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                    }}
                                    alt="product"
                                    src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${product.thumbNail}`}
                                  />
                                </tr>

                                <tr
                                  style={{
                                    width: "100%",
                                    display: "block",
                                  }}
                                >
                                  <td
                                    style={{
                                      display: "block",
                                      width: "100%",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        justityContent: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "50%",
                                          float: "left",
                                        }}
                                      >
                                        {product.productName}
                                      </div>
                                      <div
                                        style={{
                                          float: "right",
                                        }}
                                      >
                                        <Button
                                          type="primary"
                                          onClick={(e) => {
                                            showModal(product, props, e);
                                          }}
                                        >
                                          변경
                                        </Button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                <tr
                                  style={{
                                    width: "100%",
                                    display: "block",
                                  }}
                                >
                                  <td
                                    style={{
                                      width: "100%",
                                      display: "block",
                                    }}
                                  >
                                    {item.shopName}
                                  </td>
                                </tr>

                                <tr style={{ width: "100%", display: "table" }}>
                                  {product.do.map((option, index) => (
                                    <tr>
                                      <tr
                                        key={index}
                                        style={{
                                          width: "100%",
                                          display: "table",
                                        }}
                                      >
                                        <td>
                                          <div
                                            style={{
                                              border: "1px solid ",
                                            }}
                                          >
                                            <label
                                              style={{ fontWeight: "bold" }}
                                            >
                                              판다이름
                                            </label>
                                          </div>
                                          <div style={{ width: "100%" }}>
                                            {option.pandaName}
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              border: "1px solid ",
                                            }}
                                          >
                                            <label
                                              style={{ fontWeight: "bold" }}
                                            >
                                              선택옵션
                                            </label>
                                          </div>
                                          <div style={{ width: "120px" }}>
                                            {option.optionName}
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              border: "1px solid ",
                                            }}
                                          >
                                            <label
                                              style={{ fontWeight: "bold" }}
                                            >
                                              선택갯수
                                            </label>
                                          </div>
                                          <div style={{ width: "80px" }}>
                                            {option.optionCount} EA
                                          </div>
                                        </td>
                                      </tr>
                                      <tr
                                        style={{
                                          width: "100%",
                                          display: "table",
                                        }}
                                      >
                                        <td>
                                          <div
                                            style={{
                                              border: "1px solid ",
                                            }}
                                          >
                                            <label
                                              style={{ fontWeight: "bold" }}
                                            >
                                              할인전 가격
                                            </label>
                                          </div>
                                          <div style={{ width: "60px" }}>
                                            {option.originPrice
                                              .toString()
                                              .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                              )}
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              border: "1px solid ",
                                            }}
                                          >
                                            <label
                                              style={{ fontWeight: "bold" }}
                                            >
                                              최종 가격
                                            </label>
                                          </div>
                                          {option.discount ? (
                                            <div style={{ width: "100px" }}>
                                              {Math.round(
                                                option.originPrice *
                                                  option.optionCount *
                                                  0.95
                                              )
                                                .toString()
                                                .replace(
                                                  /\B(?=(\d{3})+(?!\d))/g,
                                                  ","
                                                )}
                                              <br />
                                              (판다 할인 : 5% )
                                            </div>
                                          ) : (
                                            <div style={{ width: "100px" }}>
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
                                        </td>
                                        {option.discount
                                          ? pricePlus(
                                              Math.round(
                                                option.originPrice *
                                                  option.optionCount *
                                                  0.95
                                              ),
                                              option.originPrice *
                                                option.optionCount
                                            )
                                          : pricePlus(
                                              option.originPrice *
                                                option.optionCount,
                                              option.originPrice *
                                                option.optionCount
                                            )}
                                        <td>
                                          <Button
                                            type="primary"
                                            danger
                                            onClick={(e) => {
                                              onClick(option.detailedId, e);
                                            }}
                                          >
                                            삭제
                                          </Button>
                                        </td>
                                      </tr>
                                      <br />
                                      <hr />
                                    </tr>
                                  ))}
                                </tr>
                              </tr>
                            ))}
                            <td
                              style={{
                                width: "100%",
                                display: "table",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100%",
                                    float: "left",
                                  }}
                                >
                                  <tr>
                                    {allPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    원
                                  </tr>
                                  <br />
                                  <tr>
                                    {isfree(purePrice)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    <br />(
                                    {freePrice
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}{" "}
                                    이상 무료배송)
                                  </tr>
                                </div>
                                <div
                                  style={{
                                    width: "30%",
                                    float: "right",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    onChange={(e) => onChanges(e, allPrice)}
                                    value={item.shopId}
                                  ></Checkbox>
                                </div>
                              </div>
                            </td>

                            <hr
                              style={{
                                backgroundColor: "red",
                                width: "100%",
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {/* </Col>
          </Row> */}
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
                <dl className="col-1">
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

                <dl className="col-4">
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
          // console.log("들어옴");
          // console.log(item.shopId);
          item.dp.map((product, index) => {
            product.do.map((options, index) => {
              if (options.pandaName) {
                total += Math.round(
                  options.originPrice * options.optionCount * 0.95
                );
              } else {
                total += Math.round(options.originPrice * options.optionCount);
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
    <div style={{ overflow: "auto" }}>
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
