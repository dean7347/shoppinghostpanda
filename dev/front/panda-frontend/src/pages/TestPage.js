import React, { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import HeaderContainer from "../containers/common/HeaderContainer";
import UserCardBlock from "../components/common/CartPage/Sections/UserCardBlock";
import { propTypes } from "../../node_modules/react-bootstrap/esm/Image";

function TestPage() {
  const [Cart, SetCart] = useState([]);

  useEffect(() => {
    //카트 정보 있는지 확인
    axios.get("/api/dashboard?size=5&page=1").then((response) => {
      //카트 아이템들에 해당하는 정보 product Collection에서 가져온 후
      //quantiyty 정보를 넣어준다

      if (response.data.success) {
        SetCart(response.data.dtos);
        // console.log("카트페이즈");
        // console.log(response.data.dtos);
        // console.log(Cart);
      } else {
        // console.log("로딩실패");
      }
    });
  }, []);

  return (
    <>
      <div style={{ zIndex: "99" }}>짬통</div>
    </>
  );
}

export default TestPage;
