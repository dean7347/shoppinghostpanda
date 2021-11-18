import React, { useEffect, useState } from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import axios from "axios";
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
      <div style={{ zIndex: "99" }}>
        <HeaderContainer />
      </div>
      {Ispanda === true ? <div>마이판다페이지</div> : <PandaRegFormContainer />}
    </>
  );
};

export default PandaPage;
