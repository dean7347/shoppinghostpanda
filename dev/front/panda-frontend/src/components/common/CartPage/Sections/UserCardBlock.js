import React, { useState, useRef, useEffect } from "react";
import { check } from "../../../../lib/api/auth";
import "./UserCardBlock.css";
import { Button, Checkbox, Divider } from "antd";
import axios from "../../../../../node_modules/axios/index";
import shop from "../../../../modules/shop";
function UserCardBlock(props) {
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = [];
  const defaultCheckedList = [];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  useEffect(() => {
    setCheckedList(defaultCheckedList);
  }, [props]);
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
                  function pricePlus(getprice) {
                    allPrice = allPrice + getprice;
                  }
                  var freePrice = item.freePrice;
                  var shipPrice = item.shipPrice;
                  //   function getfreePrice(getPrice) {
                  //     freePrice = getPrice;
                  //   }

                  //   function getShipPrice(getPrice) {
                  //     shipPrice = getPrice;
                  //   }
                  function isfree(allPrice) {
                    if (allPrice >= freePrice) {
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
                                  <td>{option.optionName}</td>
                                  <td>{option.optionCount} EA</td>
                                  <td>
                                    {option.originPrice
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                  </td>
                                  <td>
                                    {(option.originPrice * option.optionCount)
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    원
                                  </td>
                                  {pricePlus(
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
                        {isfree(allPrice)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        <br />(
                        {freePrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        이상 무료배송)
                      </td>

                      <td>
                        <Checkbox value={item.shopId}>{item.shopId}</Checkbox>
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

  return (
    <div>
      {renderbox()}

      <div style={{ marginTop: "3rem" }}>
        <h2>총 결제금액 :</h2>
      </div>
    </div>
  );
}

export default UserCardBlock;
