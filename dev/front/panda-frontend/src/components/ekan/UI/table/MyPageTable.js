import React, {useEffect, useState} from "react";
import "./myPageTable.css";

const MyPageTable = ({ limit, bodyData, headData, renderHead, renderBody }) => {
  const initDataShow =
    limit && bodyData ? bodyData.slice(0, Number(limit)) : bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;
  let range = [];

  if (limit !== undefined && bodyData) {
    let page = Math.floor(bodyData.length / Number(limit));
    pages = bodyData.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setDataShow(bodyData.slice(start, end));
    setCurrPage(page);
  };

  useEffect(()=>{
    if(bodyData){
      const initDataShow =
          limit && bodyData ? bodyData.slice(0, Number(limit)) : bodyData;

      setDataShow(initDataShow)
    }

  },[bodyData])

  return (
    <>
      <div className="mypage-table-wrapper">
        <table className="mypage-table">
          {headData && renderHead ? (
            <thead>
              <tr>{headData.map((item, index) => renderHead(item, index))}</tr>
            </thead>
          ) : null}
          {bodyData && renderBody && dataShow ? (
            <tbody className="mypage-tbody">
              {dataShow.map((item, index) => renderBody(item, index))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="4">데이터 없음</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default MyPageTable;
