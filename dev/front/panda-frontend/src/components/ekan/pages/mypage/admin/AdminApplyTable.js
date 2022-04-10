import React, { FC, useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../../UI/Button";
import {
  useGetAdminApplyPandaList,
  useGetAdminApplyShopList,
} from "../../../../../api/queryHooks/mypageHooks/adminPageHooks";
import axios from "../../../../../api/axiosDefaults";

function confirmOrder(event, cellValues) {
  event.stopPropagation();
  //console.log(cellValues);
}

function confirmShop(event, cellValues) {
  event.stopPropagation();
  //console.log("컨펌샵", cellValues.id);
  const body = { regid: cellValues.id, result: "confirm" };
  axios.post("/api/admin/confirmregshop", body).then((response) => {
    if (response.data) {
      alert("요청성공");
    } else {
      alert("요청실패");
    }
  });
}

function rejectShop(event, cellValues) {
  event.stopPropagation();
  //console.log("리젝트샵", cellValues.id);

  const body = { regid: cellValues.id, result: "reject" };
  axios.post("/api/admin/confirmregshop", body).then((response) => {
    if (response.data) {
      alert("요청성공");
    } else {
      alert("요청실패");
    }
  });
}

function confirmPanda(event, cellValues) {
  event.stopPropagation();
  //console.log("컨펌판다", cellValues.id);
  const body = { regid: cellValues.id, result: "confirm" };
  axios.post("/api/admin/confirmregpanda", body).then((response) => {
    if (response.data) {
      alert("요청성공");
    } else {
      alert("요청실패");
    }
  });
}

function rejectPanda(event, cellValues) {
  event.stopPropagation();
  //console.log("리젝트판다", cellValues.id);
  const body = { regid: cellValues.id, result: "reject" };
  axios.post("/api/admin/confirmregpanda", body).then((response) => {
    if (response.data) {
      alert("요청성공");
    } else {
      alert("요청실패");
    }
  });
}

const shopColumns = [
  { field: "id", headerName: "id", flex: 0.5 },
  { field: "shopName", headerName: "상점명", flex: 2 },
  { field: "number", headerName: "번호", flex: 0.7 },
  { field: "crn", headerName: "crn", flex: 1.1 },
  {
    field: "승인하기",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="승인완료"
          className="is-danger"
          onClick={(event) => {
            confirmShop(event, cellValues);
          }}
        ></Button>
      );
    },
  },
  {
    field: "거절하기",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="거절"
          className="is-danger"
          onClick={(event) => {
            rejectShop(event, cellValues);
          }}
        ></Button>
      );
    },
  },
];

const pandaColumns = [
  { field: "id", headerName: "id", flex: 0.5 },
  { field: "pandaName", headerName: "판다명", flex: 2 },
  { field: "mainCH", headerName: "플랫폼", flex: 0.7 },
  { field: "category", headerName: "카테고리", flex: 1.1 },
  {
    field: "승인하기",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="승인완료"
          className="is-danger"
          onClick={(event) => {
            confirmPanda(event, cellValues);
          }}
        ></Button>
      );
    },
  },
  {
    field: "거절하기",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="거절"
          className="is-danger"
          onClick={(event) => {
            rejectPanda(event, cellValues);
          }}
        ></Button>
      );
    },
  },
];

const AdminApplyTable = ({ selectedMode }) => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    data: shopApplyList,
    isFetching,
    refetch: refetchShop,
  } = useGetAdminApplyShopList(page);
  const { data: pandaApplyList, refetch: refetchPanda } =
    useGetAdminApplyPandaList(page);

  useEffect(() => {
    if (selectedMode === "상점신청") {
      setRows(shopApplyList?.aplist);
      setTotalElement(shopApplyList?.totalElement);
    }
    if (selectedMode === "판다신청") {
      setRows(pandaApplyList?.aplist);
      setTotalElement(pandaApplyList?.totalElement);
    }
  }, [shopApplyList, pandaApplyList, selectedMode]);

  const pageChangeAction = useCallback(
    (page) => {
      setPage(page);
      if (selectedMode === "상점신청") {
        refetchShop();
      }
      if (selectedMode === "판다신청") {
        refetchPanda();
      }
    },
    [selectedMode, page]
  );

  const confirmSelected = useCallback(
    (event) => {
      event.preventDefault();
      //console.log("선택된 주문 확인", selectedRows);
    },
    [selectedRows]
  );

  const printList = useCallback((event) => {
    event.preventDefault();
    //console.log("인쇄하기");
  }, []);

  return (
    <>
      <div className="custom-card">
        <div className="card__header">
          <Button
            className="is-danger mr-3"
            disabled={selectedRows?.length === 0}
            text="선택 확인"
            onClick={confirmSelected}
          />
          <Button
            className="is-info float-end"
            text="목록 인쇄"
            onClick={printList}
          />
        </div>
        <div style={{ width: "100%", height: "650px" }}>
          {rows && (
            <DataGrid
              style={{ color: "white" }}
              rows={rows}
              rowCount={totalElement}
              columns={selectedMode === "상점신청" ? shopColumns : pandaColumns}
              page={page}
              pageSize={10}
              loading={isFetching}
              checkboxSelection
              pagination
              paginationMode="server"
              rowsPerPageOptions={[10]}
              onPageChange={(page) => {
                pageChangeAction(page);
              }}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = rows.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setSelectedRows(selectedRows);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminApplyTable;
