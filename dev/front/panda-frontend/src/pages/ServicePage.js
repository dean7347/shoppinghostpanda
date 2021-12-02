import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import { Row, Col } from "antd";
import img1 from "../images/service1.png"
import img2 from "../images/service2.png"
import img3 from "../images/service3.png"
import img4 from "../images/service4.png"
import img8 from "../images/service8.png"

import im1 from "../images/serv1.png"
import im2 from "../images/serv2.png"
import im3 from "../images/serv3.png"








const ServicePage = ({ history }) => {
  return (
    <>
      <div style={{ zIndex: "99" }}>
        <HeaderContainer />
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <img src={img1} alt="이미지로딩중.." style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />

        <img  src={img2} alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img  src={img3} alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img  src={img4} alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src={im1} alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src={im2} alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src={im3} alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src={img8} alt="" style={{ width: "70%" }} />
      </div>
    </>
  );
};
export default ServicePage;
