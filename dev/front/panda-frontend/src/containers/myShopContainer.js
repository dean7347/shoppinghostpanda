import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import MyShop from "../components/shop/ShopRegForm";

const MyShopContainer = () => {
  return <MyShop />;
};
export default withRouter(MyShopContainer);
