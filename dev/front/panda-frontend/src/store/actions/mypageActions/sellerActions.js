import {
  FETCH_SELLER_DASHBOARD,
  FETCH_SELLER_SETTLEMENT_LIST,
} from "../../types";
import axios from "../../../api/axiosDefaults";
import { setError } from "../pageActions";

export const fetchSellerDashboard = (year, onError) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/shopdashboardmainv2", {
        year: year,
      });
      if (res.data) {
        const dashboardData = res.data;
        //console.log("대쉬보드 :", dashboardData);
        dispatch({
          type: FETCH_SELLER_DASHBOARD,
          payload: dashboardData,
        });
      }
    } catch (error) {
      console.error(error);
      onError();
      dispatch(setError("셀러 대쉬보드 통신 이상"));
    }
  };
};

export const fetchSellerSettlementList = (data, onError) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/shopdashboard", {
        searchDateMode: data.searchDateMode,
        startYear: new Date(data.startDate).getFullYear(),
        startMonth: new Date(data.startDate).getMonth(),
        startDay: new Date(data.startDate).getDate(),
        endYear: new Date(data.endDate).getFullYear(),
        endMonth: new Date(data.endDate).getMonth(),
        endDay: new Date(data.endDate).getDate(),
        status: data.searchStatus,
      });
      if (res.data) {
        const list = res.data;
        //console.log("셀러 정산 목록: ", list);
        dispatch({
          type: FETCH_SELLER_SETTLEMENT_LIST,
          payload: list,
        });
      }
    } catch (error) {
      console.error(error);
      onError();
      dispatch(setError("셀러 정산 목록 이상"));
    }
  };
};

export const fetchSellerSettlementListWithOrderNum = (data, onError) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/shopdashboardforordernumber", {
        orderId: data.orderId,
      });
      if (res.data) {
        const list = res.data;
        //console.log("셀러 정산 목록: ", list);
        dispatch({
          type: FETCH_SELLER_SETTLEMENT_LIST,
          payload: list,
        });
      }
    } catch (error) {
      console.error(error);
      onError();
      dispatch(setError("셀러 정산 목록 이상"));
    }
  };
};
