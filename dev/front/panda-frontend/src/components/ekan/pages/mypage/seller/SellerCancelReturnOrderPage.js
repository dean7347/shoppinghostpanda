import React, { useCallback, useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../../UI/Button";
import axios from "../../../../../api/axiosDefaults";
import Modal from "../../../UI/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../../../../store/actions/DateFormat";
import { fetchSituationDetail } from "../../../../../store/actions/mypageActions/buyerActions";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import CardInRefundFinish from "../../../UI/cards/CardInRefundFinish";

const SellerCancelReturnOrderPage = () => {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const { situationDetail } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const componentRef = useRef();
  // function confirmOrder(event, cellValues) {
  //   event.stopPropagation();
  //   //console.log(cellValues);
  //   //진동API작업
  //   const body = {
  //     userOrderId: cellValues.id,
  //     state: "준비중",
  //     courier: "",
  //     waybill: "",
  //   };
  //   axios.post("/api/editstatus", body).then((response) => {
  //     if (response.data.success) {
  //       alert("주문을 확인했습니다");
  //       fetchTableData();
  //     } else {
  //       alert("이미 취소된 주문이거나 주문확인에 실패했습니다");
  //       fetchTableData();
  //     }
  //   });
  // }
  // function cancelOrder(event, cellValues) {
  //   event.stopPropagation();
  //   //console.log(cellValues);
  //   //진동API작업
  //   const body = {
  //     userOrderId: cellValues.id,
  //     state: "주문취소",
  //     courier: "",
  //     waybill: "",
  //   };
  //   axios.post("/api/editstatus", body).then((response) => {
  //     if (response.data.success) {
  //       alert("주문을 취소했습니다");
  //       fetchTableData();
  //     } else {
  //       alert("주문확인에 실패했습니다");
  //     }
  //   });
  // }
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const columns = [
    { field: "id", headerName: "주문번호", flex: 0.5 },
    { field: "name", headerName: "상품명", flex: 2 },
    { field: "price", headerName: "가격", flex: 0.7 },
    { field: "orderAt", headerName: "주문일자", flex: 1.1 },
    // {
    //   field: "주문확인",
    //   flex: 0.6,
    //   renderCell: (cellValues) => {
    //     return (
    //       <Button
    //         text="주문확인"
    //         className="is-primary"
    //         onClick={(event) => {
    //           confirmOrder(event, cellValues);
    //         }}
    //       ></Button>
    //     );
    //   },
    // },
    // {
    //   field: "주문취소",
    //   flex: 0.6,
    //   renderCell: (cellValues) => {
    //     return (
    //       <Button
    //         text="주문취소"
    //         className="is-danger"
    //         onClick={(event) => {
    //           cancelOrder(event, cellValues);
    //         }}
    //       ></Button>
    //     );
    //   },
    // },
    {
      field: "주문상세",
      flex: 0.6,
      renderCell: (cellValues) => {
        return (
          <Button
            text="상세보기"
            className="is-info"
            onClick={(event) => {
              fetchOrderDetail(event, cellValues);
            }}
          ></Button>
        );
      },
    },
  ];

  const fetchOrderDetail = (event, cellValues) => {
    event.stopPropagation();
    dispatch(fetchSituationDetail(cellValues.id));
    setShowModal(true);
    //console.log(situationDetail);
  };

  // const confirmSelected = (event) => {
  //   event.preventDefault();
  //   //console.log("선택된 주문 확인", selectedRows);
  //   //진동 API작업
  //   var ids = [];
  //   for (var i = 0; i < selectedRows.length; i++) {
  //     ids.push(selectedRows[i].id);
  //   }
  //   //console.log(ids);
  //   //진동API작업
  //   const body = {
  //     userOrderId: ids,
  //     state: "준비중",
  //     courier: "",
  //     waybill: "",
  //   };
  //   axios.post("/api/selecteditstatus", body).then((response) => {
  //     if (response.data.success) {
  //       alert("주문을 확인했습니다");
  //       fetchTableData();
  //     } else {
  //       alert(response.data.message);
  //     }
  //   });
  // };

  // const cancelSelected = (event) => {
  //   event.preventDefault();
  //   //console.log("선택된 주문 확인", selectedRows);
  //   //진동 API작업
  //   var ids = [];
  //   for (var i = 0; i < selectedRows.length; i++) {
  //     ids.push(selectedRows[i].id);
  //   }
  //   //console.log(ids);
  //   //진동API작업
  //   const body = {
  //     userOrderId: ids,
  //     state: "주문취소",
  //     courier: "",
  //     waybill: "",
  //   };
  //   axios.post("/api/selecteditstatus", body).then((response) => {
  //     if (response.data.success) {
  //       alert("주문을 확인했습니다");
  //       window.location.reload();
  //     } else {
  //       alert(response.data.message);
  //     }
  //   });
  // };
  const [PLD, setPLD] = useState();

  // const PrintList = (event) => {
  //   event.preventDefault();
  //   //console.log("선택된 주문 확인", selectedRows);
  //   var ids = [];
  //   for (var i = 0; i < selectedRows.length; i++) {
  //     ids.push(selectedRows[i].id);
  //   }
  //   //진동API작업
  //   const body = {
  //     detailId: ids,
  //   };

  //   axios.post("/api/situationListdetail", body).then((response) => {
  //     if (response.data.success) {
  //       setPLD(response.data.sld);
  //     } else {
  //       alert(response.data.message);
  //       window.location.reload();
  //     }
  //   });
  // };

  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/shop/shoporderlist?type=change&size=10&page=${page}`
      );
      const data = response.data;
      //console.log("데이타보자", data);
      setLoading(false);
      data.pageList.forEach((data) => {
        data.orderAt = dateFormatter(data.orderAt);
      });
      setRows(data.pageList);
      setTotalElement(data.totalElement);
    } catch (err) {
      //console.log("테이블 요청 오류");
    }
  }, [page]);

  useEffect(() => {
    fetchTableData();
  }, [page]);

  // function printPage(e) {
  //   // //console.log(e);
  //   const s = <div dangerouslySetInnerHTML={t}>zz</div>;

  //   //console.log(t);
  //   <div id="tt">아이디</div>;
  //   //console.log("프린트페이지 실행");
  //   var initBody;
  //   window.onbeforeprint = function () {
  //     initBody = document.body.innerHTML;
  //     // document.body.innerHTML = document.getElementById("0").innerHTML;
  //     // initBody = s;
  //     document.body.innerHTML = testRef.current;
  //   };
  //   window.onafterprint = function () {
  //     document.body.innerHTML = initBody;
  //   };
  //   window.print();

  //   <>
  //     <div id="tt">ttt</div>
  //   </>;
  // }
  function printPage() {
    const a = <div id="print">인쇄할 영역</div>;

    var initBody;
    window.onbeforeprint = function () {
      initBody = document.body.innerHTML; //기존내용 저장
      document.body.innerHTML = document.getElementById("testdiv").innerHTML;
    };
    window.onafterprint = function () {
      document.body.innerHTML = initBody;
    };
    window.print();
    return false;
  }

  useEffect(() => {
    //console.log("유즈이펙트");
    //console.log("유즈이펙트PLD");
    //console.log(PLD);
    function createMarkup() {
      return { __html: "First &middot; Second" };
    }

    if (PLD && PLD.length > 0) {
      //console.log("인쇄실행");
      //console.log(PLD);
      PLD.map((data, idx) => {
        var pro = `<hr/> `;
        var option;
        var count;
        data.products.map((pr, id) => {
          pro += `<div>${pr.productName}</div>`;
          pr.options.map((op, i) => {
            pro += `<div>옵션명 : ${op.optionName}/ 주문수량 : ${op.optionCount}개</div>
        <div>-------<div>
            <br/>`;
          });
        });
        const element = document.getElementById("testdiv");
        element.innerHTML = `<CardInListVshop situationDetail=${data} />`;
        element.innerHTML = `
        <div>주문번호 : ${data.detailId}</div>

        <div>받으시는분 : ${data.receiver}</div>
        <div>받으시는분 전화번호 : ${data.receiverPhone}</div>
        <div>우편번호 : ${data.addressNum}</div>
        <div>주소 : ${data.address}</div>
        <div>배송메모 : ${data.shipmemo}</div>

        <div>-------<div>
        <div>구매자 이름 : ${data.buyerName}</div>
        <div>구매자 전화번호 : ${data.buyerPhone}</div>
        <div>-------<div>
        <div>주문일시 : ${data.orderAt}</div>
        <div>-------<div>
        <div>주문내역 : 
        <div>-------<div>
        ${pro}</div>
        <div>-------<div>
 `;

        // element.innerHTML = a.;
        // element.innerHTML = createMarkup.innerHTML;
        printPage();
      });
      fetchTableData();
    }
  }, [PLD]);

  // const renderPLD = () => {
  //   return (
  //     <>
  //       <Button onClick={() => printPage(PLD)}>특정영역</Button>
  //       <button onClick={handlePrintt}>Print this out!</button>;
  //       <div>zz{PLD && PLD.length}</div>
  //       <div ref={componentRef}>
  //         {PLD && //console.log(PLD + "zzz")}
  //         {PLD &&
  //           PLD.map((data, idx) => {
  //             return (
  //               <div>
  //                 <div id="test">Test{idx}</div>
  //                 <CardInListVshop id={idx} situationDetail={data} />
  //                 {/* {printPage()} */}
  //               </div>
  //             );
  //           })}
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="container">
        <div className="custom-card">
          <div className="card__header">
            {/* <Button
              className="is-primary mr-3"
              disabled={selectedRows.length === 0}
              text="최종환불페이지"
              onClick={confirmSelected}
            />
            <Button
              className="is-danger"
              disabled={selectedRows.length === 0}
              text="선택 주문 취소"
              onClick={cancelSelected}
            />
            <Button
              className="is-info float-end"
              text="주문서 1인쇄(인쇄시 주문확인)"
              onClick={PrintList}
            /> */}
          </div>
          <div style={{ width: "100%", height: "600px" }}>
            <DataGrid
              rows={rows}
              rowCount={totalElement}
              columns={columns}
              page={page}
              pageSize={10}
              loading={loading}
              checkboxSelection
              pagination
              paginationMode="server"
              rowsPerPageOptions={[10]}
              onPageChange={(page) => {
                setPage(page);
              }}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = rows.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setSelectedRows(selectedRows);
              }}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
          title={"주문 상세보기"}
        >
          {situationDetail ? (
            <>
              <CardInRefundFinish situationDetail={situationDetail} />
            </>
          ) : (
            <div>데이터 없음</div>
          )}
        </Modal>
      )}
      {/* {renderPLD()} */}
      <div
        id="testdiv"
        style={{
          display: "none",
        }}
      >
        주문서출력
      </div>
    </>
  );
};

export default SellerCancelReturnOrderPage;
