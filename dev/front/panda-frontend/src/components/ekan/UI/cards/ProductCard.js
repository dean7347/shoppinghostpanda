import React from "react";
import { useHistory } from "react-router-dom";
import "./productCard.css";
const ProductCard = ({
  id,
  title,
  content,
  image,
  price,
  seller,
  sellerNum,
  status,
  date,
  children,
}) => {
  let history = useHistory();
  const thumbnail = {
    width: "100%",
    maxWidth: "180px",
    height: "180px",
    borderRadius: "10px",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "inline-block",
    verticalAlign: "top",
    margin: "auto",
  };

  return (
    <div className="product-container">
      <ul
        className="product row"
        onClick={() => {
          history.push("/detail/" + id);
        }}
      >
        <li className="thumbnail col-3" style={thumbnail}></li>
        <li className="product-content col-5">
          <h5 className="title">{title}</h5>
          <p>{date}</p>
          <p>{price}원</p>
          <p>{status}</p>
          <p>{seller}</p>
          <p>{sellerNum}</p>
        </li>
        <li className="product-right col-3">{children}</li>
      </ul>
    </div>
  );
};

export default ProductCard;
