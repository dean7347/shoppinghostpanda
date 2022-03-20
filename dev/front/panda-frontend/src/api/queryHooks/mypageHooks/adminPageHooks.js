import { useQuery } from "react-query";
import axios from "../../axiosDefaults";

export const AdminKeysEnum = {
  AdminPandaSettlementList: "adminPandaSettlementList",
  AdminPandaSettlementCompleteList: "adminPandaSettlementCompleteList",
  AdminShopSettlementList: "adminShopSettlementList",
  AdminShopSettlementCompleteList: "adminShopSettlementCompleteList",
  AdminApplyShopList: "adminApplyShopList",
  AdminApplyPandaList: "adminApplyPandaList",
};

export const useGetAdminPandaSettlementList = (page) =>
  useQuery(AdminKeysEnum.AdminPandaSettlementList, async () => {
    const res = await axios.get(
      `/api/admin/pandaSettleList?size=10&page=${page}`
    );
    return res.data;
  });

export const useGetAdminPandaSettlementCompleteList = (page) =>
  useQuery(AdminKeysEnum.AdminPandaSettlementCompleteList, async () => {
    const res = await axios.get(
      `/api/admin/completepandaSettleList?size=10&page=${page}`
    );
    return res.data;
  });

export const useGetAdminShopSettlementList = (page) =>
  useQuery(AdminKeysEnum.AdminShopSettlementList, async () => {
    const res = await axios.get(
      `/api/admin/shopSettleList?size=10&page=${page}`
    );
    return res.data;
  });

export const useGetAdminShopSettlementCompleteList = (page) =>
  useQuery(AdminKeysEnum.AdminShopSettlementCompleteList, async () => {
    const res = await axios.get(
      `/api/admin/completeshopSettleList?size=10&page=${page}`
    );
    return res.data;
  });

export const useGetAdminApplyShopList = (page) =>
  useQuery(AdminKeysEnum.AdminApplyShopList, async () => {
    const res = await axios.get(
      `/api/admin/applyShopList?size=10&page=${page}`
    );
    return res.data;
  });

export const useGetAdminApplyPandaList = (page) =>
  useQuery(AdminKeysEnum.AdminApplyPandaList, async () => {
    const res = await axios.get(
      `/api/admin/applyPandaList?size=10&page=${page}`
    );
    return res.data;
  });
