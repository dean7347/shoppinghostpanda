import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPageV2";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import regShopPage from "./pages/regShopPage";
import newProductPage from "./pages/newProductPage";
import EditProductPage from "./pages/EditProductPage";

import LandingPage from "./pages/LandingPage";
import ProductSearchPage from "./pages/ProductSearchPage";
import DetailProductPage from "./pages/DetailProductPage";
import PaymentCompletePage from "./pages/PaymentCompletePage";
import PandaPage from "./pages/PandaPage";
import CartPage from "./pages/CartPage";
import "antd/dist/antd.css";
import PaymentPage from "./pages/PaymentPage";
import PriPage from "./pages/PriPage";
import ServicePage from "./pages/ServicePage";
import TermPage from "./pages/TermPage";
import TestPage from "./pages/TestPage";
import Footer from "./components/common/Footer";
import BuyerMyPage from "./components/ekan/pages/mypage/buyer/BuyerMyPage";

const App = () => {
  return (
    <div style={{ overflow: "fixed" }}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Switch>
          <Route
            component={LandingPage}
            path={["/@:username", "/", "/product/search/"]}
            exact
          />
          <Route
            component={ProductSearchPage}
            path={["/product/search/:productname"]}
            exact
          />
          <Route component={LoginPage} path="/login" exact />
          <Route component={RegisterPage} path="/register" exact />
          <Route component={WritePage} path="/write" exact />
          <Route component={PostPage} path="/@:username/:postId" exact />
          <Route component={regShopPage} path={"/shop"} exact />
          <Route component={newProductPage} path={"/shop/newProduct"} exact />
          <Route
            component={EditProductPage}
            path={"/shop/editProduct/:productId"}
            exact
          />
          <Route
            component={DetailProductPage}
            path={"/product/:productId"}
            exact
          />
          <Route component={PandaPage} path={"/panda"} exact />
          <Route component={CartPage} path={"/user/cart"} exact />
          <Route component={PaymentPage} path={"/user/payments"} exact />
          <Route
            component={PaymentCompletePage}
            path={"/user/payments/complete"}
            exact
          />
          <Route component={PriPage} path={"/private"} exact />
          <Route component={TermPage} path={"/terms"} exact />
          <Route component={ServicePage} path={"/service"} exact />
          <Route path="/buyer" component={BuyerMyPage} />
          {/* //api테스트용 짬통페이지 */}
          <Route path="/testpage" component={TestPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};
export default App;
