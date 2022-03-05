import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import ProductContainer from "../containers/product/ProductContainer";

function newProductPage() {
  return (
    <>
      <div style={{ zIndex: "99" }}></div>
      <ProductContainer />
    </>
  );
}

export default newProductPage;
