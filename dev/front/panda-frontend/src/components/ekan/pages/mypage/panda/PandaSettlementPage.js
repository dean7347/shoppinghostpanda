import React from 'react';
import MyPageTable from "../../../UI/table/MyPageTable";
import {useDispatch, useSelector} from "react-redux";
import Badge from "../../../UI/badge/Badge";
import {pandaSettlementTable} from "./pandaTypes";
import PandaSettlementPanel from "../../../UI/panel/PandaSettlementPanel";
import Message from "../../../UI/Message";

const PandaSettlementPage = () => {
    const dispatch = useDispatch()
    const {pandaSettlementList} = useSelector((state) => state.panda)
    const { error } = useSelector((state) => state.page);

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
            <td>{(item.orderAt).slice(0, 10)}</td>
            <td> </td>
            <td>{item.price} ₩</td>
            <td>
                <Badge type={orderStatus[item.status]} content={item.status}/>
            </td>
        </tr>
    )

    return (
        <>
            <div className="container">
                {error && <Message type="danger" msg={error} />}
                <PandaSettlementPanel/>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="custom-card">
                            <div className="card__body">
                                {
                                    pandaSettlementList ?
                                        <MyPageTable
                                            limit="5"
                                            headData={pandaSettlementTable.header}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={pandaSettlementList.pandaDashboardDtoList}
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

export default PandaSettlementPage;
