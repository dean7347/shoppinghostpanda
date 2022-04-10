import React from "react";
import MyPageTable from "../../../UI/table/MyPageTable";
import { useSelector } from "react-redux";
import Badge from "../../../UI/badge/Badge";
import Message from "../../../UI/Message";
import SellerSettlementPanel from "../../../UI/panel/SellerSettlementPanel";
import { sellerSettlementTable } from "./sellerTypes";
import Button from "../../../UI/Button";
import * as XLSX from "xlsx";

const SellerSettlementPage = () => {
  const { sellerSettlementList } = useSelector((state) => state.seller);
  const { error } = useSelector((state) => state.page);

  const orderStatus = {
    지급완료: "primary",
    지급예정: "success",
    지급대기: "success",
  };
  function onClickDown(all) {
    //console.log(all);
    //console.log("셀세", sellerSettlementList);
    var event = all.shopDashboardDtoTypeList;
    var subject =
      sellerSettlementList.name +
      " " +
      sellerSettlementList.standard +
      "기준" +
      " 데이터 " +
      sellerSettlementList.startDay.slice(0, 10) +
      "~" +
      sellerSettlementList.endDay.slice(0, 10);
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

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      {/* 주문번호 */}
      <td>{item.id} </td>
      {/* 판매금액 */}
      {/* <td>{item.beforeSalePrice}</td> */}
      {/* 판매금액(환불금 포함) */}
      <td>{item.realPrice}</td>
      {/* 환불액 */}
      <td>{item.settlePrice}</td>
      {/* 배송료 */}
      <td>{item.shipPrice}</td>
      {/* 실정산액 */}
      <td>{item.shopPrice}</td>
      {/* 수수료 */}
      <td>{item.fees}</td>
      {/* 판매일 */}
      {item.salesDate === null ? (
        <td>NODATA</td>
      ) : (
        <td>{item.salesDate.slice(2, 10)}</td>
      )}
      {/* 구매확정일 */}
      {item.confirmDate === null ? (
        <td>NODATA</td>
      ) : (
        <td>{item.confirmDate.slice(2, 10)}</td>
      )}
      {/* 정산예장일 */}
      {item.expectDate === null ? (
        <td>NODATA</td>
      ) : (
        <td>{item.expectDate.slice(2, 10)}</td>
      )}{" "}
      {/* 정산일 */}
      {item.depositCompleted === null ? (
        <td>정산예정</td>
      ) : (
        <td>{item.depositCompleted.slice(2, 10)}</td>
      )}{" "}
      {/* <td>{item.expectDate.slice(0, 10)}</td> */}
      {/* <td>{item.depositCompleted.slice(0, 10)}</td> */}
      <td>
        <Badge
          type={orderStatus[item.paymentStatus]}
          content={item.paymentStatus}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="container">
        {error && <Message type="danger" msg={error} />}
        <SellerSettlementPanel />

        <div className="row mt-4">
          <div className="col-12">
            <div className="custom-card">
              <div className="card__header">
                {sellerSettlementList && (
                  <div>
                    <Message
                      msg={`예상금액 : ${sellerSettlementList.expectMoney} 원 //
                                    정산된 금액: ${sellerSettlementList.finMoney} 원`}
                      type="info"
                    />
                    {sellerSettlementList.expectMoney === 0 &&
                    sellerSettlementList.finMoney === 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        {" "}
                        <Button
                          text="다운로드"
                          className="is-danger"
                          onClick={(event, subject) => {
                            onClickDown(sellerSettlementList);
                          }}
                        ></Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="card__body">
                {sellerSettlementList ? (
                  <MyPageTable
                    limit="5"
                    headData={sellerSettlementTable.header}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={sellerSettlementList.shopDashboardDtoTypeList}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSettlementPage;
