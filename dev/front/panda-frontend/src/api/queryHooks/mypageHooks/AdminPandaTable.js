import React, { FC, useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../../components/ekan/UI/Button";
import {
  useGetAdminPandaSettlementCompleteList,
  useGetAdminPandaSettlementList,
} from "./adminPageHooks";
import axios from "../../axiosDefaults";
import * as XLSX from "xlsx";

function confirmOrder(event, cellValues) {
  event.stopPropagation();
  //console.log(cellValues);
}
function onClickDown(all) {
  //console.log("다운", all);

  var count = 0;
  var settle = 0;
  all.row.slofp.map((item, idx) => {
    count += item.count;
    settle += item.pandaMoney;
  });

  const ws = XLSX.utils.json_to_sheet(all.row.slofp);

  var wscols = [
    { wch: 20 },
    { wch: 20 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
    { wch: 40 },
  ];

  ws["!cols"] = wscols;
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  [
    "주문번호",
    "판매 상품명",
    "갯수",
    "판다 정산금",
    "정산예정일",
    "정산완료일",
    "정산상태",
  ].forEach((x, idx) => {
    const cellAdd = XLSX.utils.encode_cell({ c: idx, r: 0 });
    ws[cellAdd].v = x;
    ws[cellAdd].s = {
      // styling for all cells
      font: {
        sz: 60,
        bold: true,
        color: { rgb: "FFAA00" },
      },
    };
  });

  XLSX.utils.sheet_add_aoa(
    ws,
    [
      ["---"],
      [
        "합계",
        "",
        count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        settle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      ],
      [
        "실정산액",
        (settle - Math.round(settle * 0.033))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        "원천징수",
        Math.round(settle * 0.033)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      ],
    ],

    {
      origin: -1,
    }
  );

  XLSX.writeFile(
    wb,
    all.row.pandaname + "의 정산" + all.row.enrollSettle.slice(0, 10) + ".xlsx"
  );
}

function confirmOrderPandaDepost(event, cellValues) {
  event.stopPropagation();
  //console.log(cellValues);
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
  {
    field: "정산다운로드",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="다운로드"
          className="is-danger"
          onClick={(event, subject) => {
            onClickDown(cellValues);
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

  //console.log(pandaSettlementList);

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
