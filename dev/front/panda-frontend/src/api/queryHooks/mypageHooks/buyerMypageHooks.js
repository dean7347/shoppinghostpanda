import { useQuery } from "react-query";
import axios from "../../axiosDefaults";

export const BuyerKeysEnum = {
  RecentSituationList: "recentSituationList",
  RecentSituationDetail: "recentSituationDetail",
  BuyerDashboard: "buyerDashboard",
};

export const useGetRecentSituationList = (size, page) =>
  useQuery(
    [BuyerKeysEnum.RecentSituationList, page],
    async () => {
      const res = await axios.get(
        `/api/recentsituation?size=${size}&page=${page}`
      );
      return res.data;
    },
    {
      keepPreviousData: true,
    }
  );

export const useGetBuyerDashboard = () =>
  useQuery(BuyerKeysEnum.BuyerDashboard, async () => {
    const res = await axios.get("/api/dashboard");
    return res.data;
  });

export const useGetSituationDetail = (detailId) =>
  useQuery(
    [BuyerKeysEnum.RecentSituationDetail, detailId],
    async () => {
      const res = await axios.post("/api/situationdetailv2", {
        detailId: detailId,
      });
      return res.data;
    },
    {
      enabled: !!detailId,
    }
  );
