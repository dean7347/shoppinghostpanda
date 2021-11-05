import React, { useEffect, useState } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";

function PagementCompletePage(props) {
  console.log(props.location.state.result);
  const payResult = props.location.state.paymentResult;
  const payLoad = props.location.state.payLoad;
  useEffect(() => {
    console.log("변경감지");
    console.log(payResult);
    console.log(payLoad);
    if (payResult === undefined) {
      console.log("잘못된접근");
    }
  }, [payLoad, payResult]);

  return (
    <>
      <HeaderContainer />
    </>
  );
}

export default PagementCompletePage;
