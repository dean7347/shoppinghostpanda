import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserCardBlock from "../components/common/CartPage/Sections/UserCardBlock";
import { propTypes } from "../../node_modules/react-bootstrap/esm/Image";

function TestPage() {
  const onClickRe = () => {
    axios.post("/api/reissue").then((response) => {
      //console.log(response);
    });
  };
  // useEffect(() => {
  //   // axios.get("/api/dashboard").then((response) => {
  //   //   if (response.data.success) {
  //   //     //console.log(response.data);

  //   //   } else {
  //   //     // //console.log("로딩실패");
  //   //   }
  //   // });

  //   // axios.get("/api/recentsituation?size=1&page=3").then((response) => {
  //   //   //console.log(response.data);
  //   //   if (response.data.success) {
  //   //     //console.log(response.data);
  //   //   } else {
  //   //   }
  //   // });

  //   // const body = {
  //   //   detailId: 183,
  //   // };
  //   axios.post("/api/situationdetail", body).then((response) => {
  //     //console.log(response.data);
  //     if (response.data.success) {
  //       //console.log("짬통");

  //       //console.log(response.data);
  //     } else {
  //     }
  //   });
  // }, []);

  return (
    <>
      <div style={{ zIndex: "99" }}>짬통</div>
      <button onClick={() => onClickRe("z")}>리잇슈</button>
    </>
  );
}

export default TestPage;
