import React, { useEffect, useState } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import { useHistory } from "react-router-dom";
function PagementCompletePage(props) {
  let history = useHistory();

  console.log(props);
  if (props.location.state === undefined) {
    alert("잘못된 접근입니다");
    history.goBack();
  }
  // if (!props.location.state.prevPath? && === "/user/payments") {
  //   alert("잘못된 접근입니다");
  // }
  return (
    <>
      <HeaderContainer />
      <div>주문이 완료되었습니다</div>
      <button> 돌아갑니다</button>
    </>
  );
}

export default PagementCompletePage;
