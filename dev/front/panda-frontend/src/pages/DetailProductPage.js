import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderContainer from "../containers/common/HeaderContainer";
import Footer from "../components/common/Footer";

import ProductImage from "../components/sections/ProductImage";
import ProductInfo from "../components/sections/ProductInfo";
import { Row, Col, Tabs } from "antd";

import PandaView from "../components/common/PandaView";
function DetailProductPage(props) {
  const { TabPane } = Tabs;
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});
  const [DetailImage, setDetailImage] = useState([{}]);
  const [Pandas, SetPandas] = useState([{}]);

  useEffect(() => {
    axios.get(`/api/getpandas_by_id?id=${productId}`).then((response) => {
      if (response.data.success) {
        SetPandas(response.data.details);
        console.log("판다스정보");
        console.log(response.data.details);
      } else {
        console.log("판다스 정보를 가져오지 못했습니다");
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}`)
      .then((response) => {
        if (response.data.success) {
          setProduct(response.data);
          setDetailImage(response.data.detailImages);
        } else {
          alert("상세정보 가져오기를 실패했습니다");
        }
      });
  }, []);

  const detailImage = DetailImage.map((item, index) => {
    return (
      <div key={index + item.filepath}>
        <img
          style={{ width: "100%", objectFit: "cover" }}
          src={`http://localhost:8080/upload/${item.filepath}`}
          alt=""
        />
        <br />
      </div>
    );
  });

  return (
    <>
      <HeaderContainer />
      <div style={{ width: "100%", padding: "3rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{Product.productName}</h1>
        </div>
        <br />
        <Row gutter={[16, 16]}>
          <Col lg={12} sm={24}>
            <ProductImage detail={Product} />
          </Col>

          <Col lg={12} sm={24}>
            <ProductInfo detail={Product} proId={productId} pandas={Pandas} />
          </Col>

          <Col lg={24} sm={24}>
            <Tabs defaultActiveKey="1" type="card" size={"small"}>
              <TabPane tab="상품 상세" key="1">
                <div
                  style={{
                    background: "red",
                    justifyContent: "center",
                  }}
                >
                  {detailImage}
                </div>
              </TabPane>
              <TabPane tab="판다보기" key="2">
                <PandaView pandas={Pandas} />
              </TabPane>
              <TabPane tab="상품 후기" key="3">
                상품후기 페이지
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DetailProductPage;
