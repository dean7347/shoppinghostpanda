import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import Responsive from "./Responsive";
import styled from "styled-components";
import ShopRegFormContainer from "../../containers/shop/ShopRegFormContainer";
import HeaderContainer from "../../containers/common/HeaderContainer";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Shop = ({ shop }) => {
  console.log("shop" + shop);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <h1>상점이 없으시군요!</h1>
          <h3>신청중이시라면 최대한 빠르게 검토하겠습니다!</h3>
        </div>
        <ShopRegFormContainer />
      </div>
      {/* {shop.haveshop.shop === true && (
        <div>
          {shop.haveshop.shopName} 쇼핑몰 회원님 반갑습니다!
          <br />
          <Button to="/shop/newProduct">상품등록하기</Button>
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
