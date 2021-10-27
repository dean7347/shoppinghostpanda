import React from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PostListPage from "./pages/PostListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import regShopPage from "./pages/regShopPage";
import newProductPage from "./pages/newProductPage";
import LandingPage from "./pages/LandingPage";
import ProductSearchPage from "./pages/ProductSearchPage";
import DetailProductPage from "./pages/DetailProductPage";
import PandaPage from "./pages/PandaPage";
import CartPage from "./pages/CartPage";
import "antd/dist/antd.css";

const App = () => {
  return (
    <>
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
      <Route component={DetailProductPage} path={"/product/:productId"} exact />
      <Route component={PandaPage} path={"/panda"} exact />
      <Route component={CartPage} path={"/user/cart"} exact />

      {/* <Route component={myShopPage} path={"/:shopName"} exact /> */}
    </>
  );
};
export default App;
