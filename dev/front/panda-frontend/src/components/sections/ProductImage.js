import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

//썸네일 gm 모듈 사용

function ProductImage(props) {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.thumbs && props.detail.thumbs.length > 0) {
      let images = [];
      props.detail.thumbs.map((item) => {
        images.push({
          original: `http://localhost:8080/upload/${item.filepath}`,
          thumbnail: `http://localhost:8080/upload/${item.filepath}`,
        });
      });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
