import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderContainer from "../containers/common/HeaderContainer";
import ProductImage from "../components/sections/ProductImage";
import ProductInfo from "../components/sections/ProductInfo";
import { Row, Col } from "antd";
function DetailProductPage(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setProduct(response.data);
        } else {
          alert("상세정보 가져오기를 실패했습니다");
        }
      });
  }, []);
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
            <ProductInfo detail={Product} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DetailProductPage;
