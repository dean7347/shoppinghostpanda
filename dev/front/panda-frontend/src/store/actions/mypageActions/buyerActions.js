import {
  FETCH_BUYER_DASHBOARD,
  FETCH_BUYER_SITUATION,
  FETCH_BUYER_SITUATION_LIST,
  FETCH_CANCEL_SITUATION_DETAIL,
  FETCH_CANCEL_SITUATION_LIST,
} from "../../types";
import axios from "../../../api/axiosDefaults";
import { setError } from "../pageActions";
// 대쉬보드
export const fetchDashBoard = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/dashboard");

      if (res.data) {
        const dashBoardData = res.data;
        //console.log("대쉬보드 박스: ", dashBoardData);
        dispatch({
          type: FETCH_BUYER_DASHBOARD,
          payload: dashBoardData,
        });
      }
    } catch (error) {
      //console.log(error);
      dispatch(setError("마이페이지 통신 이상"));
    }
  };
};
// 최근주문 전체
export const fetchSituationList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/recentsituation");

      if (res.data) {
        const list = res.data;
        //console.log("최근주문: ", list);
        dispatch({
          type: FETCH_BUYER_SITUATION_LIST,
          payload: list,
        });
      }
    } catch (error) {
      //console.log(error);
      dispatch(setError("최근 주문 통신 이상"));
    }
  };
};
// 최근주문 페이지네이션
export const fetchSituationWithPage = (size, page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/recentsituation?size=${size}&page=${page}&sord=id,DESC`
      );

      if (res.data) {
        const list = res.data;
        //console.log("리스트 출력");

        //console.log(list);
        dispatch({
          type: FETCH_BUYER_SITUATION_LIST,
          payload: list,
        });
      }
    } catch (error) {
      //console.log(error);
      dispatch(setError("최근 주문 통신 이상"));
    }
  };
};
// 최근주문 상세보기
export const fetchSituationDetail = (detailId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/situationdetailv2", {
        detailId: detailId,
      });

      if (res.data) {
        const detail = res.data;
        //console.log("주문디테일: ", detail);
        dispatch({
          type: FETCH_BUYER_SITUATION,
          payload: detail,
        });
      }
    } catch (error) {
      //console.log(error);
      dispatch(setError("주문 상세보기 통신 이상"));
    }
  };
};
// 취소 주문 페이지
export const fetchCancelSituationWithPage = (size, page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/cancelsituation?size=${size}&page=${page}&sord=id,DESC`
      );

      if (res.data) {
        const list = res.data;
        //console.log("취소 리스트 출력");

        //console.log(list);
        dispatch({
          type: FETCH_CANCEL_SITUATION_LIST,
          payload: list,
        });
      }
    } catch (error) {
      //console.log(error);
      dispatch(setError("취소 주문 통신 이상"));
    }
  };
};
// 취소주문 상세보기
export const fetchCancelSituationDetail = (detailId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/cancelSituationdetailv2", {
        detailId: detailId,
      });

      if (res.data) {
        const detail = res.data;
        //console.log("취소디테일: ", detail);
        dispatch({
          type: FETCH_CANCEL_SITUATION_DETAIL,
          payload: detail,
        });
      }
    } catch (error) {
      //console.log(error);
      dispatch(setError("취소 상세보기 통신 이상"));
    }
  };
};
