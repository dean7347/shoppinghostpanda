import React, { FC, useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../../../UI/Button";
import {
  useGetAdminShopSettlementCompleteList,
  useGetAdminShopSettlementList,
} from "../../../../../api/queryHooks/mypageHooks/adminPageHooks";
import axios from "../../../../../api/axiosDefaults";
import CsvDownload from "react-json-to-csv";
import * as XLSX from "xlsx";
// function confirmOrder(event, cellValues) {
//   event.stopPropagation();
//   //console.log(cellValues);
// }

function onClickDown(all) {
  //console.log(all);
  var event = all.row.shopDashboardDtoTypeList;
  var subject =
    all.row.shopName + "정산서 " + all.row.enrollSettle.slice(0, 10);
  // var result = [];

  // result.push([5, { 전체금액: 2000 }]);
  // //console.log(result);
  // var finalcsv = JSON.parse(JSON.stringify(result));
  // //console.log(finalcsv);
  // //console.log(event);

  //판매금액
  var salesMoney = 0;
  //상품금액
  var productPrice = 0;
  //배송비
  var shipPrice = 0;
  //상점정산금액
  var shopSettle = 0;
  //환불금액
  var refundMoney = 0;
  //수수료
  var fee = 0;
  event.map((va, indx) => {
    //console.log(va);
    salesMoney += va.realPrice;
    productPrice += va.beforeSalePrice;
    shipPrice += va.shipPrice;
    shopSettle += va.shopPrice;
    refundMoney += va.settlePrice;
    fee += va.fees;
  });

  const ws = XLSX.utils.json_to_sheet(event);
  var wscols = [
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 40 },
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
    "판매 금액",
    "상품금액",
    "배송비",
    "상점 정산금액",
    "환불 금액",
    "수수료",
    "판매일자",
    "구매확정일자",
    "정산예정일",
    "정산일자",
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
        salesMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        shipPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        shopSettle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        refundMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      ],
    ],
    { origin: -1 }
  );

  ws["A1"].s = {
    font: {
      name: "Calibri",
      sz: 90,
      bold: true,
      color: { rgb: "FFFFAA00" },
    },
  };
  XLSX.writeFile(wb, subject + ".xlsx");
}

function confirmOrderShopDepost(event, cellValues) {
  event.stopPropagation();
  //console.log(cellValues);
  const body = {
    id: cellValues.id,
    type: "shop",
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
  { field: "shopName", headerName: "상점명", flex: 1.5 },
  { field: "deposit", headerName: "금액", flex: 0.7 },
  { field: "enrollSettle", headerName: "정산일자", flex: 1.1 },
  {
    field: "샵정산확인",
    flex: 0.8,
    renderCell: (cellValues) => {
      return (
        <Button
          text="정산확인"
          className="is-danger"
          onClick={(event) => {
            confirmOrderShopDepost(event, cellValues);
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

const AdminShopTable = ({ selectedMode }) => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalElement, setTotalElement] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    data: shopSettlementList,
    isFetching,
    refetch: refetchSettlement,
  } = useGetAdminShopSettlementList(page);
  const { data: shopSettlementCompleteList, refetch: refetchComplete } =
    useGetAdminShopSettlementCompleteList(page);

  useEffect(() => {
    if (selectedMode === "정산필요") {
      setRows(shopSettlementList?.settleShopDetails);
      setTotalElement(shopSettlementList?.totalElement);
    }
    if (selectedMode === "정산완료") {
      setRows(shopSettlementCompleteList?.settleShopDetails);
      setTotalElement(shopSettlementCompleteList?.totalElement);
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

export default AdminShopTable;
