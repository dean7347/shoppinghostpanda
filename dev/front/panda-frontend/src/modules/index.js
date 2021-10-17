// 루트 리듀서

import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import user, { userSaga } from "./user";
import shop, { shopSaga } from "./shop";

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  shop,
});
export function* rootSaga() {
  //all 여러 사가를 합쳐주는 함수
  yield all([authSaga(), userSaga(), shopSaga()]);
}

export default rootReducer;
