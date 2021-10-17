import React from "react";
import { Carousel } from "antd";
function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px", minHeight: "150px" }}
              src={`http://localhost:8080/upload/${image.filepath}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
