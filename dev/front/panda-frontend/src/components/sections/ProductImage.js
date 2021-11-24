import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

//썸네일 gm 모듈 사용

function ProductImage(props) {
  const [Images, setImages] = useState([]);
  useEffect(() => {
    if (props.detail.thumbs && props.detail.thumbs.length > 0) {
      let images = [];
      props.detail.thumbs.map((item, index) => {
        images.push({
          original: `https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${item.filepath}`,
          thumbnail: `https://shoppinghostpandabucket.s3.ap-northeast-2.amazonaws.com/${item.filepath}`,
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
