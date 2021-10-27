import React, { useEffect } from "react";
import axios from "../../node_modules/axios/index";

function CartPage() {
  useEffect(() => {
    //카트 정보 있는지 확인
    axios.get("/api/mycart").then((response) => {
      //카트 아이템들에 해당하는 정보 product Collection에서 가져온 후
      //quantiyty 정보를 넣어준다
    });
  }, []);

  return;
  <div></div>;
}

export default CartPage;
