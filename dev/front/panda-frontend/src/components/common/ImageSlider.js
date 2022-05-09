import React from "react";
import { Carousel } from "antd";
function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%",  minHeight: "150px" }}
              src={`https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${image.filepath}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
