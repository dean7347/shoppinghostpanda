import React, { Suspense, useLayoutEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import Navbar from "./components/sections/navbar/Navbar";
import Footer from "./components/common/Footer";
import Loader from "./components/ekan/UI/Loader";
import { useSelector } from "react-redux";
import AdminIndex from "./components/ekan/pages/mypage/admin/AdminIndex";
import { useAuthStore } from "./store/authHooks";
import { useWindowStore } from "./store/windowHooks";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const WritePage = React.lazy(() => import("./pages/WritePage"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPageV2"));
const BuyerIndex = React.lazy(() =>
  import("./components/ekan/pages/mypage/buyer/BuyerIndex")
);
const PandaIndex = React.lazy(() =>
  import("./components/ekan/pages/mypage/panda/PandaIndex")
);
const PrivateRoute = React.lazy(() => import("./components/auth/PrivateRoute"));
const SellerIndex = React.lazy(() =>
  import("./components/ekan/pages/mypage/seller/SellerIndex")
);

const PostPage = React.lazy(() => import("./pages/PostPage"));
const regShopPage = React.lazy(() => import("./pages/regShopPage"));
const newProductPage = React.lazy(() => import("./pages/newProductPage"));
const EditProductPage = React.lazy(() => import("./pages/EditProductPage"));
const ProductSearchPage = React.lazy(() => import("./pages/ProductSearchPage"));
const DetailProductPage = React.lazy(() => import("./pages/DetailProductPage"));
const PaymentCompletePage = React.lazy(() =>
  import("./pages/PaymentCompletePage")
);

const PandaPage = React.lazy(() => import("./pages/PandaPage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const PaymentPage = React.lazy(() => import("./pages/PaymentPage"));
const PriPage = React.lazy(() => import("./pages/PriPage"));
const ServicePage = React.lazy(() => import("./pages/ServicePage"));
const TermPage = React.lazy(() => import("./pages/TermPage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));
const FindIdPage = React.lazy(() => import("./pages/FindIdPage"));

const App = () => {
  const loading = useWindowStore((state) => state.loading);
  const reIssue = useAuthStore((state) => state.reIssue);

  useLayoutEffect(() => {
    reIssue();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ overflow: "fixed" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Suspense fallback={<Loader />}>
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
            <Route component={SignIn} path="/signin" exact />
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
            <Route component={CartPage} path={"/user/cart"} exact />
            <Route component={PaymentPage} path={"/user/payments"} exact />
            <Route
              component={PaymentCompletePage}
              path={"/user/payments/complete"}
              exact
            />
            <Route component={FindIdPage} path={"/find_id_pw"} exact />

            <Route component={PriPage} path={"/private"} exact />
            <Route component={PandaPage} path={"/pandareg"} exact />
            <Route component={TermPage} path={"/terms"} exact />
            <Route component={ServicePage} path={"/service"} exact />
            <PrivateRoute path="/buyer" component={BuyerIndex} />
            <PrivateRoute path="/panda" component={PandaIndex} />
            <PrivateRoute path="/seller" component={SellerIndex} />
            <PrivateRoute path="/ekjd/admin" component={AdminIndex} />
            {/* //api테스트용 짬통페이지 */}
            <Route path="/testpage" component={TestPage} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};
export default App;
