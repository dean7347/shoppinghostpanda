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
import SellerNewOrderPage from "./seller/SellerNewOrderPage";
import SellerReadyOrderPage from "./seller/SellerReadyOrderPage";
import SellerShipOrderPage from "./seller/SellerShipOrderPage";
import SellerCompleteOrderPage from "./seller/SellerCompleteOrderPage";
import MyProductPage from "../../../../pages/MyProductPage";
import SellerCancelReturnOrderConfirmPage from "./seller/SellerCancelReturnOrderConfirmPage";
import SellerCancelReturnOrderPage from "./seller/SellerCancelReturnOrderPage";
import AdminPandaManagementPage from "./admin/AdminPandaManagementPage";
import AdminShopManagementPage from "./admin/AdminShopManagementPage";
import AdminApplyManagementPage from "./admin/AdminApplyManagementPage";
import BuyerInfoPage from "./buyer/BuyerInfoPage";

const MyPageRoutes = () => {
  return (
    <Switch>
      <Route path="/buyer/dashboard" exact component={BuyerDashboard} />
      <Route path="/buyer/orderList" exact component={OrderListPage} />
      <Route path="/buyer/cancelList" exact component={CancelListPage} />
      <Route path="/buyer/cart" exact component={BuyerCartPage} />
      <Route path="/buyer/infoPage" exact component={BuyerInfoPage} />
      <Route path="/panda/dashboard" exact component={PandaDashboard} />
      <Route path="/panda/video" exact component={PandaVideoPage} />
      <Route path="/panda/settlement" exact component={PandaSettlementPage} />
      <Route path="/seller/dashboard" exact component={SellerDashboard} />
      <Route path="/seller/product" component={MyProductPage} exact />
      <Route path="/seller/settlement" exact component={SellerSettlementPage} />
      <Route path="/seller/newOrder" exact component={SellerNewOrderPage} />
      <Route path="/seller/readyOrder" exact component={SellerReadyOrderPage} />
      <Route path="/seller/shipOrder" exact component={SellerShipOrderPage} />
      <Route
        path="/seller/CompleteOrder"
        exact
        component={SellerCompleteOrderPage}
      />
      <Route
        path="/seller/CancelReturnOrderPage"
        exact
        component={SellerCancelReturnOrderConfirmPage}
      />{" "}
      <Route
        path="/seller/CancelReturnOrderConfirmPage"
        exact
        component={SellerCancelReturnOrderPage}
      />
      <Route
        path="/ekjd/admin/pandaManagement"
        exact
        component={AdminPandaManagementPage}
      />
      <Route
        path="/ekjd/admin/sellerManagement"
        exact
        component={AdminShopManagementPage}
      />
      <Route
        path="/ekjd/admin/applyManagement"
        exact
        component={AdminApplyManagementPage}
      />
    </Switch>
  );
};

export default MyPageRoutes;
