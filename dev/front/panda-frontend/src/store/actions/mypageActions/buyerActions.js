import {
  FETCH_DASHBOARD,
  FETCH_SITUATION,
  FETCH_SITUATION_LIST,
} from "../../types";
import axios from "axios";
import { setError } from "../pageActions";

export const fetchDashBoard = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/dashboard");

      if (res.data) {
        const dashBoardData = res.data;
        console.log("대쉬보드 박스: ", dashBoardData);
        dispatch({
          type: FETCH_DASHBOARD,
          payload: dashBoardData,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("마이페이지 통신 이상"));
    }
  };
};

export const fetchSituationList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/recentsituation");

      if (res.data) {
        const list = res.data;
        console.log("최근주문: ", list);
        dispatch({
          type: FETCH_SITUATION_LIST,
          payload: list,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("최근 주문 통신 이상"));
    }
  };
};

export const fetchSituationWithPage = (size, page) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `/api/recentsituation?size=${size}&page=${page}&sord=id,DESC`
      );

      if (res.data) {
        const list = res.data;
        console.log("리스트 출력");

        console.log(list);
        dispatch({
          type: FETCH_SITUATION_LIST,
          payload: list,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("최근 주문 통신 이상"));
    }
  };
};

export const fetchSituationDetail = (detailId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/situationdetailv2", {
        detailId: detailId,
      });

      if (res.data) {
        const detail = res.data;
        console.log("주문디테일: ", detail);
        dispatch({
          type: FETCH_SITUATION,
          payload: detail,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setError("주문 상세보기 통신 이상"));
    }
  };
};
