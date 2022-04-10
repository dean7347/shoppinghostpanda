import React from "react";
import Button from "./Button";
import ShopRegFormContainer from "../../containers/shop/ShopRegFormContainer";

const Shop = ({ shop }) => {
  // //console.log("shop" + shop);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <h1>상점이 없으시군요!</h1>
          <h3>신청중이시라면 최대한 빠르게 검토하겠습니다!</h3>
        </div>
        <ShopRegFormContainer />
        {/* <Button to="/shop/newProduct">상품등록하기</Button> */}
      </div>
      {/* {shop.haveshop.shop === true && (
        <div>
          {shop.haveshop.shopName} 쇼핑몰 회원님 반갑습니다!
          <br />
        </div>
      )}
      {shop.haveshop.shop === false && (
        <div style={{ textAlign: "center" }}>
          <div>
            <h1>상점이 없으시군요!</h1>
            <h3>신청중이시라면 최대한 빠르게 검토하겠습니다!</h3>
          </div>
          <ShopRegFormContainer />
        </div>
      )} */}
    </>
  );
};
export default Shop;
