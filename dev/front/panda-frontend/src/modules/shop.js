import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import * as ShopAPI from "../lib/api/shop";
import { check } from "../lib/api/auth";

const CHANGE_FIELD = "shop/CHANGE_FIELD";
const INITIALIZE_FORM = "shop/INITIALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("shop/createShop");

const [haveSHOP, haveSHOP_SUCCESS, haveSHOP_FAILURE] =
  createRequestActionTypes("shop/haveShop");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //register,login
    key, //username,password,passwordConfirm
    value, //실제바꾸려는값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); //register/login

// 밖에서 실행하는거
export const shopRegister = createAction(
  REGISTER,
  ({ shopName, crn, freePrice, address, number }) => ({
    shopName,
    crn,
    freePrice,
    address,
    number,
  })
);

export const haveShop = createAction(haveSHOP);
const haveShopSaga = createRequestSaga(haveSHOP, ShopAPI.haveShop);

//사가 생성
const shopRegisterSaga = createRequestSaga(REGISTER, ShopAPI.regShop);

//!!등록되는 사가명
export function* shopSaga() {
  yield takeLatest(REGISTER, shopRegisterSaga);
  yield takeLatest(haveSHOP, haveShopSaga);
}

const initialState = {
  shopRegisterForm: {
    shopName: "",
    crn: "",
    freePrice: "",
    address: "",
    number: "",
  },
  shop: null,
  haveshop: {
    shop: false,
    shopName: "",
  },
  shopRegisterError: null,
};

const shop = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; //예: state.register.username을 바꾼다.
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      shopRegisterError: null, //폼전환시 회원 인증 에러 초기화
    }),
    //상점가입 성공
    [REGISTER_SUCCESS]: (state, { payload: shop }) => ({
      ...state,
      shopRegisterError: null,
      shop,
    }),
    //상점가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      shopRegisterError: error,
    }),

    [haveSHOP_SUCCESS]: (state, { payload: haveshop }) => ({
      ...state,
      haveshop,
      checkError: null,
    }),
    [haveSHOP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      haveshop: null,
      checkError: error,
    }),
  },
  initialState
);

export default shop;
