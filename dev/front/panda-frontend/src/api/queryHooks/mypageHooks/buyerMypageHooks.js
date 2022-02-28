import { useQuery } from "react-query";
import axios from "axios";

export const BuyerEnum = {
  RecentSituation: "recentSituation",
  RecentSituationDetail: "recentSituationDetail",
  BuyerDashboard: "buyerDashboard",
};

export const useGetRecentSituation = () =>
  useQuery(BuyerEnum.RecentSituation, () =>
    axios.get("/api/recentsituation").then((res) => res.data)
  );

export const useGetBuyerDashboard = () =>
  useQuery(BuyerEnum.BuyerDashboard, () =>
    axios.get("/api/dashboard").then((res) => res.data)
  );

export const useGetSituationDetail = (detailId) =>
  useQuery(
    [BuyerEnum.RecentSituationDetail, detailId],
    () =>
      axios
        .post("/api/situationdetailv2", {
          detailId: detailId,
        })
        .then((res) => res.data),
    {
      enabled: !!detailId,
    }
  );
