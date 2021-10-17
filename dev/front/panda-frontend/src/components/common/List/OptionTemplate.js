import React from "react";
import "./OptionTemplate.scss";

const OptionTemplate = ({ children }) => {
  return (
    <div className="Template">
      <div className="app-title">상품 옵션</div>
      <div className="cotent">{children}</div>
    </div>
  );
};
export default OptionTemplate;
