import client from "./client";

//샵등록
export const regShop = ({ shopName, crn, freePrice, address, number }) =>
  client.post("/api/createShop", { shopName, crn, freePrice, address, number });

//샵있는지 확인
export const haveShop = () => client.get("/api/haveshop");
