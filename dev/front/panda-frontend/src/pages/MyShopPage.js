import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";

function MyShopPage() {
  return (
    <>
      <div style={{ zIndex: "99" }}>
        <HeaderContainer />
      </div>
      {/* <MyShopViewerContainer /> */}
      <div>마이샵페이지</div>;
    </>
  );
}

export default MyShopPage;
