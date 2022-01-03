import React, { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserCardBlock from "../components/common/CartPage/Sections/UserCardBlock";
import { propTypes } from "../../node_modules/react-bootstrap/esm/Image";

function TestPage() {
  useEffect(() => {
    // //카트 정보 있는지 확인
    // axios.get("/api/dashboard").then((response) => {
    //   //카트 아이템들에 해당하는 정보 product Collection에서 가져온 후
    //   //quantiyty 정보를 넣어준다

    //   if (response.data.success) {
    //     console.log("짬통");

    //     console.log(response.data);
    //     // console.log("카트페이즈");
    //     // console.log(response.data.dtos);
    //     // console.log(Cart);
    //   } else {
    //     // console.log("로딩실패");
    //   }
    // });

    axios.get("/api/recentsituation").then((response) => {
      //카트 아이템들에 해당하는 정보 product Collection에서 가져온 후
      //quantiyty 정보를 넣어준다
      console.log(response.data);
      if (response.data.success) {
        console.log("짬통");

        console.log(response.data);
        // console.log("카트페이즈");
        // console.log(response.data.dtos);
        // console.log(Cart);
      } else {
        // console.log("로딩실패");
      }
    });

    const body = {
      detailId: 178,
    };
    // axios.post("/api/situationdetail", body).then((response) => {
    //   console.log(response.data);
    //   if (response.data.success) {
    //     console.log("짬통");
    //
    //     console.log(response.data);
    //     // console.log("카트페이즈");
    //     // console.log(response.data.dtos);
    //     // console.log(Cart);
    //   } else {
    //     // console.log("로딩실패");
    //   }
    // });
  }, []);

  return (
    <>
      <div style={{ zIndex: "99" }}>짬통</div>
    </>
  );
}

export default TestPage;
