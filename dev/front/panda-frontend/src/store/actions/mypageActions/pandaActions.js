import {
  FETCH_PANDA_DASHBOARD,
  FETCH_PANDA_SETTLEMENT_LIST,
  FETCH_PANDA_VIDEO_LIST,
} from "../../types";
import axios from "../../../api/axiosDefaults";
import { setError, setLoading } from "../pageActions";

export const fetchPandaDashBoard = (year, onError) => {
  return async (dispatch) => {
    try {
      let res = await axios.post("/api/pandadashboardmain", {
        year: year,
      });
      if (res.data) {
        const data = res.data;
        //console.log(data);
        dispatch({
          type: FETCH_PANDA_DASHBOARD,
          payload: data,
        });
      }
    } catch (error) {
      console.error(error);
      onError();
      dispatch(setError("판다 대시보드 이상"));
    }
  };
};

export const fetchPandaSettlementList = (data, onError) => {
  return async (dispatch) => {
    try {
      //console.log("페치데이타");
      //console.log(new Date(data.startDate).getDate());

      const res = await axios.post("/api/pandadashboard", {
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
        //console.log("판다 정산 목록: ", list);
        dispatch({
          type: FETCH_PANDA_SETTLEMENT_LIST,
          payload: list,
        });
      }
    } catch (error) {
      //console.log(error);
      onError();
      dispatch(setError("판다 정산 목록 이상"));
    }
  };
};

export const fetchPandaSettlement = () => {
  return async (dispatch) => {};
};

export const fetchPandaVideoList = (onError) => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/pandadashboardmovie");

      if (res.data) {
        const videoList = res.data;
        //console.log("판다 비디오 목록: ", videoList);
        dispatch({
          type: FETCH_PANDA_VIDEO_LIST,
          payload: videoList,
        });
      }
    } catch (error) {
      console.error(error);
      onError();
      dispatch(setError("동영상 리스트 통신이상"));
    }
  };
};
