import React, { useState } from "react";
import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = (props) => {
  const { onPageChanged, currentPage, ViewCount, TotalCount } = props;
  // //console.log("페이징내부");

  // //console.log(ViewCount);
  // //console.log(TotalCount);
  return (
    <>
      <Pagination
        // 현재페이지
        activePage={currentPage}
        // 한 페이지당 보여줄 리스트 아이템의 갯수
        itemsCountPerPage={ViewCount}
        // 총 아이템의 개수
        totalItemsCount={TotalCount}
        // paginator내에서 보여줄 페이지 범위
        pageRangeDisplayed={5}
        // 이전
        prevPageText={"‹"}
        // 다음
        nextPageText={"›"}
        // 페이지가 바뀔때 핸들링해줄 함수
        onChange={(e) => onPageChanged(e)}
      />
    </>
  );
};
export default Paging;
