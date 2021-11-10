import React, { useState, useRef, useEffect } from "react";
import { check } from "../../../../lib/api/auth";
import "./UserCardBlock.css";
import { Button, Checkbox, Divider } from "antd";
import axios from "../../../../../node_modules/axios/index";

import Button2 from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function UserCardBlock(props) {
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [];
  const defaultCheckedList = [];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [checkprice, setCheckprice] = useState([]);

  const [payment, setPayment] = useState(0);

  useEffect(() => {
    setCheckedList(defaultCheckedList);
  }, [props]);

  const onChanges = (e, mo) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(mo);
  };
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onde = () => {
    console.log(checkedList);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onClick = (params, e) => {
    console.log(params); // error
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

  const renderbox = () => {
    return (
      <>
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
          value={checkedList}
          onChange={onChange}
        >
          <table>
            <thead>
              <th>상점명</th>
              <th>상품상세</th>
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
                      <td>{item.shopName}</td>
                      <td style={{}}>
                        {item.dp.map((product, index) => (
                          <tr key={index} style={{}}>
                            <td
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
                                src={`http://localhost:8080/upload/${product.thumbNail}`}
                              />
                            </td>
                            <td style={{ width: "20%" }}>
                              {product.productName}
                            </td>
                            <td style={{ width: "50%" }}>
                              {product.do.map((option, index) => (
                                <tr key={index}>
                                  <td>{option.pandaName}</td>
                                  <td>{option.optionName}</td>
                                  <td>{option.optionCount} EA</td>
                                  <td>
                                    {option.originPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </td>
                                  <td>
                                    {/* {(option.originPrice * option.optionCount)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    원 */}
                                    {option.discount ? (
                                      <div>
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
                                  </td>
                                  {option.discount
                                    ? pricePlus(
                                        Math.round(
                                          option.originPrice *
                                            option.optionCount *
                                            0.95
                                        ),
                                        option.originPrice * option.optionCount
                                      )
                                    : pricePlus(
                                        option.originPrice * option.optionCount,
                                        option.originPrice * option.optionCount
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
                              ))}
                            </td>
                          </tr>
                        ))}
                      </td>
                      <td>
                        {allPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </td>
                      <td>
                        {isfree(purePrice)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        <br />(
                        {freePrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        이상 무료배송)
                      </td>

                      <td>
                        <Checkbox
                          onChange={(e) => onChanges(e, allPrice)}
                          value={item.shopId}
                        >
                          {item.shopId}
                        </Checkbox>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CheckboxGroup>
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
          console.log("들어옴");
          console.log(item.shopId);
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
              console.log("------");
            });
          });
          console.log("검증!!!!");
          console.log(item.freePrice);

          if (item.freePrice > shopPrice) {
            ship += item.shipPrice;
          }
        }
      });
    console.log("총금액" + total);
    console.log("배송비" + ship);
    return { total, ship };
  };
  return (
    <div>
      {renderbox()}

      <div style={{ marginTop: "3rem" }}>
        <div style={{ float: "left" }}>
          {" "}
          <h2>
            총 결제금액 :
            {calculateTotla()
              .total.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            (상품금액) +{" "}
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
        </div>

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
