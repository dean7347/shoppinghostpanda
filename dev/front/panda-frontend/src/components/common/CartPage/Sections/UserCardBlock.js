import React from "react";
import "./UserCardBlock.css";
function UserCardBlock(props) {
  console.log(props.products.ds);

  const renderItems = () =>
    props.products.ds &&
    props.products.ds.map((item, index) => (
      // console.log(item);
      <tr>
        <td>{item.shopName}</td>
        {item.dp.map((product, index) => (
          <tr>
            <td>
              <img
                style={{ width: "70px" }}
                alt="product"
                src={`http://localhost:8080/upload/${product.thumbNail}`}
              />
            </td>
          </tr>
        ))}
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>상점명</th>
            <th>상품사진</th>
            <th>상품이름</th>
            <th>옵션이름</th>
            <th>취소하기</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
