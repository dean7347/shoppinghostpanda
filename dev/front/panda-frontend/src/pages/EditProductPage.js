import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import ProductContainer from "../containers/product/ProductContainer";
import EditProductForm from "../components/product/EditProductForm";
function EditProductPage(props) {
  return (
    <>
      <div style={{ zIndex: "99" }}></div>
      <EditProductForm productId={props.location.state.proid} />
    </>
  );
}

export default EditProductPage;
