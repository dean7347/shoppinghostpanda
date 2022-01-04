import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import createSagaMiddleware from "redux-saga";
import {BrowserRouter} from "react-router-dom";

// 스토어생성 프로바이더를 통해 리액트 프로젝트에 리덕스 적용
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer, {rootSaga} from "./modules";
import {tempSetUser, check} from "./modules/user";

import 'bulma/css/bulma.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/theme.css'
import './assets/css/index.css'
import store from "./store";

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

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
