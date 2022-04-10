import React, { useEffect } from "react";
import MyPageTable from "../../../UI/table/MyPageTable";
import { useDispatch, useSelector } from "react-redux";
import Badge from "../../../UI/badge/Badge";
import { pandaSettlementTable } from "./pandaTypes";
import PandaSettlementPanel from "../../../UI/panel/PandaSettlementPanel";
import Message from "../../../UI/Message";
import { setError } from "../../../../../store/actions/pageActions";
import Button from "../../../UI/Button";
import * as XLSX from "xlsx";
const PandaSettlementPage = () => {
  const dispatch = useDispatch();
  const { pandaSettlementList } = useSelector((state) => state.panda);
  const { error } = useSelector((state) => state.page);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  });
  function onClickDown(all) {
    //console.log(all.pandaData);
    var count = 0;
    var settle = 0;
    all.pandaData.map((item, idx) => {
      //console.log(item);
      count += item.count;
      settle += item.pandaMoney;
    });

    const ws = XLSX.utils.json_to_sheet(all.pandaData);

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

    XLSX.writeFile(wb, "판다" + "의 정산" + "날짜" + ".xlsx");
  }

  const orderStatus = {
    지급완료: "primary",
    지급예정: "success",
    지급대기: "success",
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.localDateTime.slice(0, 10)}</td>

      <td>{item.id} </td>
      <td>{item.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₩</td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="container">
        {error && <Message type="danger" msg={error} />}
        <PandaSettlementPanel />

        <div className="row mt-4">
          <div className="col-12">
            <div className="custom-card">
              <div className="card__header">
                {pandaSettlementList && (
                  <div>
                    <Message
                      msg={`예상금액 : ${pandaSettlementList.expectMoney} 원 //
                                    정산된 금액: ${pandaSettlementList.finMoney} 원`}
                      type="info"
                    />
                    {pandaSettlementList.expectMoney === 0 &&
                    pandaSettlementList.finMoney === 0 ? (
                      <div></div>
                    ) : (
                      <div>
                        {" "}
                        <Button
                          text="다운로드"
                          className="is-danger"
                          onClick={(event, subject) => {
                            onClickDown(pandaSettlementList);
                          }}
                        ></Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="card__body">
                {pandaSettlementList ? (
                  <MyPageTable
                    limit="5"
                    headData={pandaSettlementTable.header}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={pandaSettlementList.pandaDashboardDtoList}
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

export default PandaSettlementPage;
