import React, { useCallback, useEffect, useState } from "react";
import { dashboardCard } from "./buyerTypes";
import StatusCard from "../../../UI/cards/StatusCard";
import MyPageTable from "../../../UI/table/MyPageTable";
import Badge from "../../../UI/badge/Badge";
import { latestOrders } from "./buyerTypes";
import Modal from "../../../UI/modal/Modal";
import { Link } from "react-router-dom";
import Message from "../../../UI/Message";
import {
  useGetBuyerDashboard,
  useGetRecentSituationList,
  useGetSituationDetail,
} from "../../../../../api/queryHooks/mypageHooks/buyerMypageHooks";
import LoadingComponent from "../../../UI/LoadingComponent";
import CardInList from "../../../UI/cards/CardInList";
import { Pagination } from "@mui/material";
import { Button } from "../../../../../../node_modules/antd/lib/index";
import axios from "../../../../../api/axiosDefaults";
const orderStatus = {
  결제완료: "primary",
  준비중: "primary",
  완료: "primary",
  주문취소: "danger",
  배송중: "success",
  발송중: "success",
  구매확정: "success",
  반품: "warning",
  환불대기: "warning",
  환불완료: "warning",
  상점확인중: "warning",
};

const renderHead = (item, index) => <th key={index}>{item}</th>;

const BuyerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [cardItems, setCardItems] = useState(dashboardCard);
  const [detailId, setDetailId] = useState(0);
  const [page, setPage] = useState(0);
  const { data: buyerDashboard } = useGetBuyerDashboard();
  const { data: buyerSituationDetail, isFetching: detailFetching } =
    useGetSituationDetail(detailId);
  const { data: buyerSituationList, error: situationError } =
    useGetRecentSituationList(5, page);

  useEffect(() => {
    let copy = [...cardItems];
    if (buyerDashboard) {
      copy[0].count = buyerDashboard.readyProduct;
      copy[1].count = buyerDashboard.finishProduct;
      copy[2].count = buyerDashboard.cancelProduct;
      copy[3].count = buyerDashboard.cartProduct;
      setCardItems(copy);
    }
  }, [buyerDashboard]);

  const handleClick = useCallback(
    async (item) => {
      await setDetailId(+item);
      setShowModal(true);
    },
    [detailId]
  );
  const onTestCheck = (p, s, c, w) => {
    if (s !== "구매확정") {
      alert("올바른 요청이 아닙니다");
      return;
    }

    //console.log(p + s);
    const body = {
      userOrderId: p,
      state: s,
      //발송중 항목에는 해당 항목을 넣어서 보낸다 없다면 ""을 담아서 보낸다
      courier: c,
      waybill: w,
    };
    axios.post("/api/editstatus", body).then((response) => {
      if (response.data.success) {
        alert("구매확정에 성공했습니다 감사합니다.");
      } else {
        alert("구매확정에 실패했습니다. 해당 현상이 계속된다면 꼭 문의주세요.");
      }
    });
  };

  const onCancelOrder = (p) => {
    //console.log("취소신청");
    //console.log(p);
    const body = {
      detailId: p,
    };
    axios.post("/api/userordercancel", body).then((response) => {
      if (response.data.success) {
        alert("해당 옵션을 취소했습니다");
      } else {
        alert(response.data.message);
      }
    });
  };

  const handlePageChange = useCallback(
    (e) => {
      e.preventDefault();
      setPage(+e.target.textContent - 1);
    },
    [page]
  );

  const renderButton = (st, id) => {
    if (st === "결제완료") {
      return (
        <td>
          <Button onClick={() => onCancelOrder(id)} danger>
            주문취소
          </Button>
        </td>
      );
    } else if (st === "발송중") {
      return (
        <td>
          <Button
            type="primary"
            onClick={() => onTestCheck(id, "구매확정", "c", 123)}
          >
            구매확정
          </Button>
        </td>
      );
    } else if (st === "준비중") {
      return <td> 준비중입니다</td>;
    } else {
      return <td> 감사합니다</td>;
    }
  };

  const renderBody = (item, index) => (
    <tr
      key={index}
      // onClick={() => {
      //   handleClick(item.num);
      // }}
    >
      <td>{item.num}</td>
      <td>{item.productName}</td>
      <td>{item.price} ₩</td>
      <td>{item.orderAt.slice(0, 10)}</td>
      {renderButton(item.status, item.num)}

      {/* <td>
        <Button>구매확정</Button>
      </td> */}
      <td>
        <Button
          onClick={() => {
            handleClick(item.num);
          }}
        >
          상세보기
        </Button>
      </td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );

  const renderBodyMobile = (item, index) => (
    <tr key={index}>
      <td>{item.productName}</td>
      <td>
        <Badge type={orderStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );

  return (
    <>
      <div className="container">
        <Link to="/">
          {/*<h3 className="page-header">마이페이지{data?.data.url}</h3>*/}
        </Link>

        {situationError && <Message type="danger" msg={"통신 에러"} />}
        {/*card*/}
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              {cardItems.map((item, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <StatusCard
                    link={item.link}
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="custom-card">
              <div className="card__header">
                <h3>최근 주문 현황</h3>
              </div>
              {/*table pc*/}
              <div className="card__body is-hidden-mobile">
                {buyerSituationList ? (
                  <MyPageTable
                    limit="5"
                    headData={latestOrders.header}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={buyerSituationList.pageList}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                ) : null}
              </div>
              {/*mobile table*/}
              <div className="card__body is-hidden-tablet">
                {buyerSituationList ? (
                  <MyPageTable
                    limit="5"
                    headData={latestOrders.headerMobile}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={buyerSituationList.pageList}
                    renderBody={(item, index) => renderBodyMobile(item, index)}
                  />
                ) : null}
              </div>
              <div className="card__footer">
                <Pagination
                  count={buyerSituationList?.totalpage}
                  sx={{ maxWidth: 350 }}
                  className="mx-auto"
                  onChange={handlePageChange}
                />
              </div>
            </div>
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
          {buyerSituationDetail ? (
            <>
              <CardInList situationDetail={buyerSituationDetail} />
            </>
          ) : detailFetching ? (
            <LoadingComponent type={"spin"} />
          ) : (
            <></>
          )}
        </Modal>
      )}
    </>
  );
};

export default BuyerDashboard;
