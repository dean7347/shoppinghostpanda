import React from "react";
import "./UserCardBlock.css";
function UserCardBlock(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ProductImage</th>
            <th>ProductQuantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default UserCardBlock;
