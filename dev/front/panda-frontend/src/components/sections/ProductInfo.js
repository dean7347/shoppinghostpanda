import React from "react";
import { Button, Descriptions } from "antd";

function ProductInfo(props) {
  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">cdo</Descriptions.Item>
        <Descriptions.Item label="Sold">co1</Descriptions.Item>
        <Descriptions.Item label="View">co2</Descriptions.Item>
        <Descriptions.Item label="Description">
          props.detail.desc
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default ProductInfo;
