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
import axios from "./api/axiosDefaults";
import { getCookie, removeCookie, setCookie } from "./store/Cookie";
import { QueryClient, QueryClientProvider } from "react-query";

// // const sagaMiddleware = createSagaMiddleware();
// // const store = createStore(
// //   rootReducer,
// //   composeWithDevTools(applyMiddleware(sagaMiddleware))
// // );

// // function loadUser() {
// //     try {
// //         const user = localStorage.getItem("user");
// //         if (!user) return; //로그인 상태가 아니라면 아무것도 안함
// //         store.dispatch(tempSetUser(JSON.parse(user)));
// //         store.dispatch(check());
// //     } catch (e) {
// //         // //console.log("localStorage is not working");
// //     }
// // }
// // sagaMiddleware.run(rootSaga);
// // loadUser();
// //되는거시작
// axios.interceptors.request.use(
//   (config) => {
//     // //console.log("나가는데이터");
//     // //console.log(config.url.toString().includes("noembed"));
//     if (config.url.toString().includes("noembed.com")) {
//       return config;
//     }
//     if (config.url === "/api/reissuev2") {
//       //console.log("재발급요청입니다");

//       // const rtoken = window.localStorage.getItem("refreshToken");
//       // if (rtoken) {
//       //   config.headers["refreshToken"] = rtoken;
//       // }
//       // //console.log("콘피그", config);
//     }
//     const token = window.localStorage.getItem("accessToken");
//     // //console.log("토큰");
//     // //console.log(token);
//     if (token) {
//       config.headers["accessToken"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   function (response) {
//     /*
//             http status가 200인 경우
//             응답 성공 직전 호출됩니다.
//             .then() 으로 이어집니다.
//         */
//     //console.log(response.status);
//     if (response.status === 202) {
//       // //console.log(response);
//       // axios.request(response.config);
//       // //console.log("여기서 재 갱신을 해야하지않을까?");
//       // axios.post("/api/reissue").then((response) => {
//       //   //console.log(response.data.success);
//       //   if (response.data.success) {
//       //     originalRequest._retry = true;
//       //     //console.log(error.config);
//       //     //console.log(response);
//       //     //console.log("재요청로직을실행합니다");
//       //     return response;
//     }
//     // //console.log("200받음");
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//     // //console.log("에라");
//     //console.log(error);
//     //console.log(error.response.status);
//     if (error.response.status === 406) {
//       // //console.log("만료된토큰입니다");
//       // axios.config.headers["refreshToken"] = rtoken;
//       // //console.log("리이슈");
//       axios.post("/api/reissuev2").then((response) => {
//         //console.log("리이슈하면?", response.data);
//         //console.log();
//         window.localStorage.setItem("accessToken", response.data.accessToken);
//         // window.localStorage.setItem(
//         //   "refreshToken",
//         //   response.data.data.refreshToken
//         // );
//         if (response.data.result === "success") {
//         } else {
//           if (
//             window.confirm(
//               "로그인이 필요한 서비스입니다 로그인페이지로 이동하시겠습니까?"
//             )
//           ) {
//             window.location.replace("/signin");
//           } else {
//           }
//         }
//       });
//       return axios(originalRequest);
//     }
//     if (error.response.status === 401) {
//       //console.log("로그인이 필요한서비스입니다");
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
//       return;
//     }
//     if (error.response.status === 400) {
//       setCookie("loggedIn", "false", { path: "/" });
//       setCookie("userId", "", { path: "/" });
//       setCookie("panda", "", { path: "/" });
//       setCookie("seller", "", { path: "/" });
//       removeCookie("loggedIn");
//       removeCookie("userId");
//       removeCookie("panda");
//       removeCookie("seller");
//       //console.log("에라2");
//       if (
//         window.confirm(
//           "로그인이 필요한 서비스입니다 로그인페이지로 이동하시겠습니까?"
//         )
//       ) {
//         window.location.replace("/signin");
//       } else {
//       }

//       return;
//     }

//     return Promise.reject(error);
//   }
// );
// //되는거끝

// // axios.interceptors.response.use(
// //   (response) => {
// //     return response;
// //   },
// //   async (error) => {
// //     const originalConfig = error.config;
// //     if (error.response) {
// //       if (error.response.status === 401 && !originalConfig._retry) {
// //         originalConfig._retry = true;
// //         // Do something, call refreshToken() request for example;
// //         // return a request
// //         return axios_instance(config);
// //       }
// //       if (error.response.status === ANOTHER_STATUS_CODE) {
// //         // Do something
// //         return Promise.reject(error.response.data);
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 60000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// //console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
