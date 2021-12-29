import {Link} from 'react-router-dom'
import {dashboardCard} from "./buyerTypes";
import {latestOrders} from "./buyerTypes";
import MyPageTable from "../../../UI/table/MyPageTable";
import Badge from "../../../UI/badge/Badge";
import StatusCard from "../../../UI/cards/StatusCard";

const BuyerDashboard = () => {

    const orderStatus = {
        "완료": "primary",
        "취소중": "warning",
        "배송중": "success",
        "반품": "danger"
    }

    const renderHead = (item, index) => (
        <th key={index}>{item}</th>
    )

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.user}</td>
            <td>{item.price}</td>
            <td>{item.date}</td>
            <td>
                <Badge type={orderStatus[item.status]} content={item.status}/>
            </td>
        </tr>
    )

    const renderBodyMobile = (item, index) => (
        <tr key={index}>
            <td>{item.user}</td>
            <td>
                <Badge type={orderStatus[item.status]} content={item.status}/>
            </td>
        </tr>
    )

    return (
        <>

            <div className="container">
                <h3 className="page-header">마이페이지</h3>
                {/*card*/}
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            {
                                dashboardCard.map((item, index) =>
                                    <div className="col-lg-3 col-md-6" key={index}>
                                        <StatusCard
                                            link={item.link}
                                            icon={item.icon}
                                            count={item.count}
                                            title={item.title}/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card__header">
                                <h3>최근 주문 현황</h3>
                            </div>
                            {/*table pc*/}
                            <div className="card__body is-hidden-mobile">
                                <MyPageTable
                                    headData={latestOrders.header}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={latestOrders.body}
                                    renderBody={(item, index) => renderBody(item, index)}
                                />
                            </div>
                            {/*mobile table*/}
                            <div className="card__body is-hidden-tablet">
                                <MyPageTable
                                    headData={latestOrders.headerMobile}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={latestOrders.body}
                                    renderBody={(item, index) => renderBodyMobile(item, index)}
                                />
                            </div>
                            <div className="card__footer">
                                <Link to='/orderList'>더보기</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default BuyerDashboard
