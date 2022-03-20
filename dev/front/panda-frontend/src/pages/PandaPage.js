import React, { useEffect, useState } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import axios from "../api/axiosDefaults";
import PandaRegFormContainer from "../containers/panda/PandaRegFormContainer";

const PandaPage = () => {
  const [Ispanda, setIspanda] = useState();
  useEffect(() => {
    axios.get("/api/ispanda").then((response) => {
      setIspanda(response.data.ispanda);
    });
  });
  return (
    <>
      <div style={{ zIndex: "99" }}></div>
      {Ispanda === true ? (
        <div style={{ textAlign: "center" }}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1>판다 승인 신청 대기중입니다</h1>
          <h2>문의사항이 있으신경우 </h2>
          <h2>shoppinghostpanda@gmail.com </h2>
          <h2>으로 문의남겨주세요 </h2>
        </div>
      ) : (
        <PandaRegFormContainer />
      )}
    </>
  );
};

export default PandaPage;
