import "antd/dist/antd.css";
import "./App.css";
import MainPageComponent from "./main";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload";
import ProductPage from "./product";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import LoginApp from './components/jwtlogin/LoginApp'
import './bootstrap.css';
import Header from "./header";

function App() {
  const history = useHistory();
  
  return (
    <div >
      <div id="header">
        <Header />
              {/* <div id="header-area">
                <Link to="/">
                  <img src="/images/icons/logo.png" />
                </Link>
                
                <Button
                  size="large"
                  onClick={function () {
                    history.push("/login");
                  }}
                  icon={<DownloadOutlined />}
                >
                  로그인
                </Button>

                <Button
                  size="large"
                  onClick={function () {
                    history.push("/upload");
                  }}
                  icon={<DownloadOutlined />}
                >
                  상품 업로드
                </Button>
              </div> 
              end header area */}


      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path="/">
            <MainPageComponent />
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage />
          </Route>

          <Route exact={true} path="/login">
            <LoginApp />
          </Route>

        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
