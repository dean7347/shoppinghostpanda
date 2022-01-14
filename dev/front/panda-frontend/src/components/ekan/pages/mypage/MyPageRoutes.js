import React from "react";

import { Route, Switch } from "react-router-dom";
import BuyerDashboard from "./buyer/BuyerDashboard";
import OrderListPage from "./buyer/OrderListPage";
import CancelListPage from "./buyer/CancelListPage";
import BuyerCartPage from "./buyer/BuyerCartPage";
import PandaDashboard from "./panda/PandaDashboard";
import PandaVideoPage from "./panda/PandaVideoPage";
import PandaSettlementPage from "./panda/PandaSettlementPage";
import SellerDashboard from "./seller/SellerDashboard";
import SellerSettlementPage from "./seller/SellerSettlementPage";

const MyPageRoutes = () => {
  return (
    <Switch>
      <Route path="/buyer/mypage" exact component={BuyerDashboard} />
      <Route path="/buyer/orderList" exact component={OrderListPage} />
      <Route path="/buyer/cancelList" exact component={CancelListPage} />
      <Route path="/buyer/cart" exact component={BuyerCartPage} />

        <Route path='/panda/dashboard' exact component={PandaDashboard}/>
        <Route path='/panda/video' exact component={PandaVideoPage}/>
        <Route path='/panda/settlement' exact component={PandaSettlementPage}/>

        <Route path='/seller/dashboard' exact component={SellerDashboard}/>
        <Route path='/seller/settlement' exact component={SellerSettlementPage}/>
    </Switch>
  );
};

export default MyPageRoutes;
