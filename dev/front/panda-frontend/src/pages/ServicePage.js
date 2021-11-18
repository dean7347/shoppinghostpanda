import React from "react";
import HeaderContainer from "../containers/common/HeaderContainer";
import { Row, Col } from "antd";

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
        <img src="images/service1.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />

        <img src="images/service2.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src="images/service3.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src="images/service4.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src="images/serv1.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src="images/serv2.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src="images/serv3.png" alt="" style={{ width: "70%" }} />
        <hr
          style={{ backgroundColor: "red", width: "70%", margin: "5px auto" }}
        />
        <img src="images/service8.png" alt="" style={{ width: "70%" }} />
      </div>
    </>
  );
};
export default ServicePage;
