import React, { FC, useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../../components/ekan/UI/Button";
import {
  useGetAdminPandaSettlementCompleteList,
  useGetAdminPandaSettlementList,
} from "./adminPageHooks";
import axios from "axios";

function confirmOrder(event, cellValues) {
  event.stopPropagation();
  console.log(cellValues);
}

function confirmOrderPandaDepost(event, cellValues) {
  event.stopPropagation();
  console.log(cellValues);
  const body = {
    id: cellValues.id,
    type: "panda",
  };

  axios.post("/api/admin/pandaSettleConfirm", body).then((response) => {
    if (response.data) {
      alert("요청성공");
    } else {
      alert("요청실패");
    }
  });
}

const columns = [
  { field: "id", headerName: "주문번호", flex: 0.5 },
  { field: "pandaname", headerName: "상점명", flex: 2 },
  { field: "deposit", headerName: "금액", flex: 0.7 },
  { field: "enrollSettle", headerName: "정산일자", flex: 1.1 },
  {
    field: "판다정산확인",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="정산확인"
          className="is-danger"
          onClick={(event) => {
            confirmOrderPandaDepost(event, cellValues);
          }}
        ></Button>
      );
    },
  },
];

const AdminPandaTable = ({ selectedMode }) => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    data: pandaSettlementList,
    isFetching,
    refetch: refetchSettlement,
  } = useGetAdminPandaSettlementList(page);
  const { data: pandaSettlementCompleteList, refetch: refetchComplete } =
    useGetAdminPandaSettlementCompleteList(page);

  console.log(pandaSettlementList);

  useEffect(() => {
    if (selectedMode === "정산필요") {
      setRows(pandaSettlementList?.settlePandaDetails);
      setTotalElement(pandaSettlementList?.totalElement);
    }
    if (selectedMode === "정산완료") {
      setRows(pandaSettlementCompleteList?.settlePandaDetails);
      setTotalElement(pandaSettlementCompleteList?.totalElement);
    }
  }, [isFetching, selectedMode]);

  const pageChangeAction = useCallback(
    (page) => {
      setPage(page);
      if (selectedMode === "정산필요") {
        refetchSettlement();
      }
      if (selectedMode === "정산완료") {
        refetchComplete();
      }
    },
    [page]
  );

  const confirmSelected = useCallback(
    (event) => {
      event.preventDefault();
      console.log("선택된 주문 확인", selectedRows);
    },
    [selectedRows]
  );

  const printList = useCallback((event) => {
    event.preventDefault();
    console.log("인쇄하기");
  }, []);

  return (
    <>
      <div className="custom-card">
        <div className="card__header">
          <Button
            className="is-danger mr-3"
            disabled={selectedRows?.length === 0}
            text="선택 정산 확인"
            onClick={confirmSelected}
          />
          <Button
            className="is-info float-end"
            text="주문서 인쇄"
            onClick={printList}
          />
        </div>
        <div style={{ width: "100%", height: "650px" }}>
          {rows && (
            <DataGrid
              style={{ color: "white" }}
              rows={rows}
              rowCount={totalElement}
              columns={columns}
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

export default AdminPandaTable;
