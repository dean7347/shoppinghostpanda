import React from 'react';
import MyPageTable from "../../../UI/table/MyPageTable";
import {useSelector} from "react-redux";
import Badge from "../../../UI/badge/Badge";
import Message from "../../../UI/Message";
import SellerSettlementPanel from "../../../UI/panel/SellerSettlementPanel";
import {sellerSettlementTable} from "./sellerTypes";

const SellerSettlementPage = () => {
    const {sellerSettlementList} = useSelector((state) => state.seller)
    const {error} = useSelector((state) => state.page);

    const orderStatus = {
        "지급완료": "primary",
        "지급예정": "success",
        "지급대기": "success",
    }

    const renderHead = (item, index) => (
        <th key={index}>{item}</th>
    )

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>USOD01{item.id} </td>
            <td>{item.settlePrice}</td>
            <td>{item.fees}</td>
            <td>{item.salesDate.slice(0, 10)}</td>
            <td>{item.expectDate.slice(0, 10)}</td>
            <td>{item.depositCompleted.slice(0, 10)}</td>
            <td>
                <Badge type={orderStatus[item.paymentStatus]} content={item.paymentStatus}/>
            </td>
        </tr>
    );

    return (
        <>
            <div className="container">
                {error && <Message type="danger" msg={error}/>}
                <SellerSettlementPanel/>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="custom-card">
                            <div className="card__header">
                                {sellerSettlementList && <Message
                                    msg={`예상금액 : ${sellerSettlementList.expectMoney} 원 //
                                    정산된 금액: ${sellerSettlementList.finMoney} 원`}
                                    type="info"/>}
                            </div>
                            <div className="card__body">
                                {
                                    sellerSettlementList ?
                                        <MyPageTable
                                            limit="5"
                                            headData={sellerSettlementTable.header}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={sellerSettlementList.shopDashboardDtoTypeList}
                                            renderBody={(item, index) => renderBody(item, index)}
                                        /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellerSettlementPage;
