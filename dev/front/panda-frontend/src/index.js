import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";

// 스토어생성 프로바이더를 통해 리액트 프로젝트에 리덕스 적용
import { Provider } from "react-redux";
import store from "./store";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { rootSaga } from "./modules";
import { tempSetUser, check } from "./modules/user";

import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./store/Cookie";

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );

// function loadUser() {
//     try {
//         const user = localStorage.getItem("user");
//         if (!user) return; //로그인 상태가 아니라면 아무것도 안함
//         store.dispatch(tempSetUser(JSON.parse(user)));
//         store.dispatch(check());
//     } catch (e) {
//         // console.log("localStorage is not working");
//     }
// }

// sagaMiddleware.run(rootSaga);
// loadUser();

axios.interceptors.response.use(
  function (response) {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다. 
        .then() 으로 이어집니다.
    */
    return response;
  },
  function (error) {
    console.log("에라");
    console.log(error.response.status);
    if (error.response.status === 303) {
      console.log("재실행이다");

      return axios(error.config);
    }
    if (error.response.status === 401) {
      console.log("로그인이 필요한서비스입니다");
      if (
        window.confirm(
          "로그인이 필요한 서비스입니다 로그인페이지로 이동하시겠습니까?"
        )
      ) {
        window.location.replace("/signin");
      } else {
      }

      if (error.response.data.code === "4401") {
        window.location.href = "/";
      }
      return;
    }
    if (error.response.status === 400) {
      removeCookie("loggedIn");
      removeCookie("userId");
      removeCookie("panda");
      removeCookie("seller");
      console.log("에라2");
      alert("로그아웃 로직 실행해야댐");

      return;
    }

    // axios.post("/api/reissue").then((response) => {
    //   console.log("리이슈");
    //   console.log(error.config);
    //   console.log(response);
    //   if (response.data.status !== 200) {
    //     console.log("와성공");
    //     console.log(response.status);

    //     return;
    //   } else {
    //     console.log("에라");

    //     if (error.response.status === 400) {
    //       alert("로그인해제");
    //       console.log("로그인해제");
    //     }
    //     if (error.response.status === 401) {
    //       if (
    //         window.confirm(
    //           "로그인이 필요한 서비스입니다 로그인페이지로 이동하시겠습니까?"
    //         )
    //       ) {
    //         window.location.replace("/signin");
    //       } else {
    //       }

    //       if (error.response.data.code === "4401") {
    //         window.location.href = "/";
    //       }
    //     }
    //   }
    // });
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.    
    */
    //401은 Access Token or Refresh Token 이 invalid 될때
    //response data의 code값이
    // 4401 : access Token error , 4402: refresh Token error

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
