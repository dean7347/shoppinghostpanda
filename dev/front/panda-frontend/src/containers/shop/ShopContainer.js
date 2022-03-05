import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import axios from "../../../node_modules/axios/index";
import Shop from "../../components/common/Shop";
import AdminShop from "../../containers/shop/AdminShop";
import { useHistory } from "react-router-dom";

const ShopContainer = ({ location, match }) => {
  // const { shop } = useSelector(({ shop }) => ({
  //   shop: shop,
  //   // shopName: shop.shop.shopName,
  // }));
  // const dispatch = useDispatch();
  // //랜더링될때마다 특정작업 실행
  // useEffect(() => {
  //   dispatch(haveShop());
  // }, [dispatch]);
  let history = useHistory();
  const [haveshop, sethaveshop] = useState({ shop: "", isapprove: "" });
  useEffect(() => {
    axios.get("/api/haveshop").then((response) => {
      // console.log("헤브샵");

      // console.log(response);
      if (response.data.success) {
        sethaveshop({
          shop: response.data.shop,
          isapprove: response.data.approve,
        });
      } else {
        sethaveshop({
          shop: false,
          isapprove: false,
        });
      }
    });
  }, []);

  if (haveshop.shop === false) {
    return (
      <>
        <Shop />
      </>
    );
  }

  if (haveshop.shop === true && haveshop.isapprove === false) {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>상점 승인 신청 대기중입니다</h1>
          <h2>문의사항이 있으신경우 </h2>
          <h2>shoppinghostpanda@gmail.com </h2>
          <h2>으로 문의남겨주세요 </h2>
        </div>
      </>
    );
  }

  if (haveshop.shop === true && haveshop.isapprove === true) {
    return (
      <>
        {history.push("/seller/dashboard")}
        {/* <AdminShop /> */}
      </>
    );
  }

  return <>상점정보를 읽어오는중입니다</>;
};

export default ShopContainer;
