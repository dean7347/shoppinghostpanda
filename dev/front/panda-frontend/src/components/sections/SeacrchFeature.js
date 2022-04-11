import React, { useState } from "react";
import { Input, Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSerachTerm] = useState(props.history);
  const searchHandler = (e) => {
    setSerachTerm(e.currentTarget.value);

    // props.refreshFunction(e.currentTarget.value);
  };

  const clickHandler = () => {};

  return (
    <div>
      {/* <Input
        placeholder="상품명 검색"
        style={{ width: 200 }}
        onChange={searchHandler}
        value={SearchTerm}
      />
      <Link to={`/product/search/${SearchTerm}`}>
        <Button type="primary" icon={<SearchOutlined />} />
      </Link> */}
    </div>
  );
}

export default SearchFeature;
