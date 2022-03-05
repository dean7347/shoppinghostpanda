import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import MyShopContainer from "../containers/myShopContainer";
import ShopContainer from "../containers/shop/ShopContainer";
const regShopPage = () => {
  return (
    <>
      <div style={{ zIndex: "99" }}></div>
      <ShopContainer />
    </>
  );
};

export default regShopPage;
