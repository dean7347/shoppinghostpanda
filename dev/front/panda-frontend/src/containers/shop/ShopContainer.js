import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import shop, { haveShop } from "../../modules/shop";
import Shop from "../../components/common/Shop";

const ShopContainer = ({ location, match }) => {
  const { shop } = useSelector(({ shop }) => ({
    shop: shop,
    // shopName: shop.shop.shopName,
  }));
  const dispatch = useDispatch();
  //랜더링될때마다 특정작업 실행
  useEffect(() => {
    dispatch(haveShop());
  }, [dispatch]);

  // const onShop = () => {
  //   dispatch(haveShop());
  // };

  return <Shop shop={shop} />;
};

export default ShopContainer;
