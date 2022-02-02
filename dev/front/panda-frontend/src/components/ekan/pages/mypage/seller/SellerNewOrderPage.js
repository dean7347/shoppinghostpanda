import React, { useCallback, useEffect, useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../../UI/Button";
import axios from "axios";
import Modal from "../../../UI/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../../../../store/actions/DateFormat";
import { fetchSituationDetail } from "../../../../../store/actions/mypageActions/buyerActions";
import CardInListVshop from "../../../UI/cards/CardInListVshop";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
function confirmOrder(event, cellValues) {
  event.stopPropagation();
  console.log(cellValues);
  //진동API작업
  const body = {
    userOrderId: cellValues.id,
    state: "준비중",
    courier: "",
    waybill: "",
  };
  axios.post("/api/editstatus", body).then((response) => {
    if (response.data.success) {
      alert("주문을 확인했습니다");
      window.location.reload();
    } else {
      alert("주문확인에 실패했습니다");
    }
  });
}

function cancelOrder(event, cellValues) {
  event.stopPropagation();
  console.log(cellValues);
  //진동API작업
  const body = {
    userOrderId: cellValues.id,
    state: "주문취소",
    courier: "",
    waybill: "",
  };
  axios.post("/api/editstatus", body).then((response) => {
    if (response.data.success) {
      alert("주문을 취소했습니다");
      window.location.reload();
    } else {
      alert("주문확인에 실패했습니다");
    }
  });
}

const SellerNewOrderPage = () => {
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { situationDetail } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = [
    { field: "id", headerName: "주문번호", flex: 0.5 },
    { field: "name", headerName: "상품명", flex: 2 },
    { field: "price", headerName: "가격", flex: 0.7 },
    { field: "orderAt", headerName: "주문일자", flex: 1.1 },
    {
      field: "주문확인",
      flex: 0.6,
      renderCell: (cellValues) => {
        return (
          <Button
            text="주문확인"
            className="is-primary"
            onClick={(event) => {
              confirmOrder(event, cellValues);
            }}
          ></Button>
        );
      },
    },
    {
      field: "주문취소",
      flex: 0.6,
      renderCell: (cellValues) => {
        return (
          <Button
            text="주문취소"
            className="is-danger"
            onClick={(event) => {
              cancelOrder(event, cellValues);
            }}
          ></Button>
        );
      },
    },
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
    console.log(situationDetail);
  };

  const confirmSelected = (event) => {
    event.preventDefault();
    console.log("선택된 주문 확인", selectedRows);
    //진동 API작업
    var ids = [];
    for (var i = 0; i < selectedRows.length; i++) {
      ids.push(selectedRows[i].id);
    }
    console.log(ids);
    //진동API작업
    const body = {
      userOrderId: ids,
      state: "준비중",
      courier: "",
      waybill: "",
    };
    axios.post("/api/selecteditstatus", body).then((response) => {
      if (response.data.success) {
        alert("주문을 확인했습니다");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    });
  };

  const cancelSelected = (event) => {
    event.preventDefault();
    console.log("선택된 주문 확인", selectedRows);
    //진동 API작업
    var ids = [];
    for (var i = 0; i < selectedRows.length; i++) {
      ids.push(selectedRows[i].id);
    }
    console.log(ids);
    //진동API작업
    const body = {
      userOrderId: ids,
      state: "주문취소",
      courier: "",
      waybill: "",
    };
    axios.post("/api/selecteditstatus", body).then((response) => {
      if (response.data.success) {
        alert("주문을 확인했습니다");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    });
  };
  const [PLD, setPLD] = useState();

  const PrintList = (event) => {
    event.preventDefault();
    console.log("선택된 주문 확인", selectedRows);
    var ids = [];
    for (var i = 0; i < selectedRows.length; i++) {
      ids.push(selectedRows[i].id);
    }
    //진동API작업
    const body = {
      detailId: ids,
    };

    axios.post("/api/situationListdetail", body).then((response) => {
      if (response.data.success) {
        setPLD(response.data.sld);
        // response.data.sld.map((data, idx) => {
        //   console.log(data);
        //   // setPLD(data)
        //   <CardInListVshop situationDetail={data} />;
        // });
        console.log("피엘디");

        console.log(PLD);
      } else {
        alert(response.data.message);
      }
    });
  };

  const fetchTableData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/shop/shoporderlist?type=recent&size=10&page=${page}`
      );
      const data = response.data;
      setLoading(false);
      data.pageList.forEach((data) => {
        data.orderAt = dateFormatter(data.orderAt);
      });
      setRows(data.pageList);
    } catch (err) {
      console.log("테이블 요청 오류");
    }
  }, [page]);

  useEffect(() => {
    fetchTableData();
  }, [page]);

  function printPage(e) {
    // console.log(e);
    const a = <div id="k">"zz"</div>;
    const ta = <CardInListVshop situationDetail={situationDetail} />;
    console.log(ta);

    // var initBody;
    // window.onbeforeprint = function () {
    //   initBody = document.body.innerHTML;
    //   document.body.innerHTML = document.getElementById("0").innerHTML;
    //   initBody = a.body.innerHTML;
    //   document.body.innerHTML = a.getElementbyId("k").innerHTML;
    // };
    // window.onafterprint = function () {
    //   document.body.innerHTML = initBody;
    // };
    // window.print();
  }

  const renderPLD = () => {
    return (
      <>
        <Button onClick={() => printPage("0")}>특정영역</Button>
        <div>zz{PLD && PLD.length}</div>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />

        <div id={0} ref={componentRef}>
          {PLD && console.log(PLD + "zzz")}
          {PLD &&
            PLD.map((data, idx) => {
              return (
                <div>
                  {"idx아이디는"}
                  {idx}
                  <CardInListVshop id={idx} situationDetail={data} />
                </div>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="custom-card">
          <div className="card__header">
            <Button
              className="is-primary mr-3"
              disabled={selectedRows.length === 0}
              text="선택 주문 확인"
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
              text="주문서 인쇄"
              onClick={PrintList}
            />
          </div>
          <div style={{ width: "100%", height: "600px" }}>
            <DataGrid
              rows={rows}
              rowCount={rows.length}
              columns={columns}
              loading={loading}
              checkboxSelection
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
              <CardInListVshop situationDetail={situationDetail} />
            </>
          ) : (
            <div>데이터 없음</div>
          )}
        </Modal>
      )}
      {renderPLD()}
    </>
  );
};

export default SellerNewOrderPage;
