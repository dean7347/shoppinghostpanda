import React, { useEffect, useState } from "react";
import axios from "../../../../../api/axiosDefaults";
import UserCardBlock from "../../../../common/CartPage/Sections/UserCardBlock";
import "./buyerCartPage.css";
import Button from "../../../UI/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
function BuyerCartPage() {
  const [Cart, SetCart] = useState([]);
  const [allAmount, setAllAmount] = useState("");
  const [shipPrice, setShipPrice] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [calculateTotal, setCalculateTotal] = useState("");
  const [ship, setShip] = useState("");

  //   const defaultCheckedList = [];
  const [checkedList, setCheckedList] = useState([]);
  useEffect(() => {
    //카트 정보 있는지 확인
    axios.get("/api/mycart").then((response) => {
      //카트 아이템들에 해당하는 정보 product Collection에서 가져온 후
      //quantiyty 정보를 넣어준다

      if (response.data.success) {
        SetCart(response.data.dtos);
        // //console.log("카트페이즈");
        // //console.log(response.data.dtos);
        // //console.log(Cart);
      } else {
        // //console.log("로딩실패");
      }
    });
  }, []);
  const history = useHistory();
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
        </div>
      </div>
    </>
  );
}

export default BuyerCartPage;
