import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCardBlock from "../../../../common/CartPage/Sections/UserCardBlock";
import "./buyerCartPage.css";
import Button from "../../../UI/Button";
import { Link } from "react-router-dom";

function BuyerCartPage() {
  const [Cart, SetCart] = useState([]);
  const [allAmount, setAllAmount] = useState("");
  const [shipPrice, setShipPrice] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [calculateTotal, setCalculateTotal] = useState("");
  const [ship, setShip] = useState("");

  const defaultCheckedList = [];
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  useEffect(() => {
    //카트 정보 있는지 확인
    axios.get("/api/mycart").then((response) => {
      //카트 아이템들에 해당하는 정보 product Collection에서 가져온 후
      //quantiyty 정보를 넣어준다

      if (response.data.success) {
        SetCart(response.data.dtos);
        // console.log("카트페이즈");
        // console.log(response.data.dtos);
        // console.log(Cart);
      } else {
        // console.log("로딩실패");
      }
    });
  }, []);

  return (
    <>
      <div className="container">
        <h3 className="page-header">장바구니</h3>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div style={{ width: "85%", margin: "3rem auto" }}>
                <h1>My Cart</h1>
                <UserCardBlock
                  products={Cart}
                  amount={setAllAmount}
                  ship={setShipPrice}
                  productPrice={setProductPrice}
                  checkList={setCheckedList}
                  total={setCalculateTotal}
                  shippingPrice={setShip}
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card order-card">
              <hr className="cart-hr" />
              <div className="row order_calculator">
                <dl className="col-2">
                  <dt>총 상품 금액</dt>
                  <dd>
                    <span>{productPrice}</span>
                  </dd>
                </dl>
                <dl className="col-1">
                  <i className="bx bx-plus-circle"></i>
                </dl>
                <dl className="col-2">
                  <dt>배송비</dt>
                  <dd>
                    <span>{shipPrice}</span>
                  </dd>
                </dl>
                <dl className="col-1">
                  <i className="bx bx-chevron-right"></i>
                </dl>
                <dl className="col-4">
                  <dt>총 주문 금액</dt>
                  <dd>
                    <span>{allAmount}</span>
                  </dd>
                </dl>
              </div>
              <hr className="cart-hr" />
              <Link
                to={{
                  pathname: `/user/payments`,
                  state: {
                    amount: calculateTotal,
                    ship: ship,
                    selectShopId: checkedList,
                  },
                }}
              >
                <Button text="결제하기" className="is-primary cart_buy_btn" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyerCartPage;
