import { LOGIN_CHECK, SET_USER, SIGN_OUT } from "../types";
import axios from "axios";
import { setError, setLoading } from "./pageActions";
import { getCookie, removeCookie, setCookie } from "../Cookie";

// Create user
export const signup = (data, onError) => {
  return async (dispatch) => {
    try {
    } catch (err) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  };
};

// login
export const signin = (data, onError) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post("/api/authenticate", {
        username: data.account,
        password: data.password,
      });
      const auth = await axios.post("/api/userauth");
      if (res.data) {
        const userData = res.data;
        console.log(userData);
        console.log("어스 :", auth.data);
        dispatch({
          type: SET_USER,
          payload: userData,
        });
        let userId = data.account.split("@");
        setCookie("loggedIn", "yes", { path: "/" });
        setCookie("userId", userId[0], { path: "/" });
        setCookie("panda", auth.data.panda, { path: "/" });
        setCookie("seller", auth.data.shop, { path: "/" });
        dispatch(setLoading(false));
      }
    } catch (err) {
      console.log(err);
      onError();
      dispatch(setError("아이디나 비밀번호를 확인해 주십시오"));
      dispatch(setLoading(false));
    }
  };
};

// signout
export const signout = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.get("http://localhost:8080/api/user/logout");
      removeCookie("loggedIn");
      removeCookie("userId");
      removeCookie("panda");
      removeCookie("seller");
      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  };
};

// checkUserwithCookies
export const loginCheck = () => {
  const loggedIn = getCookie("loggedIn");
  if (loggedIn === "yes") {
    return {
      type: LOGIN_CHECK,
      payload: true,
    };
  }
  return {
    type: LOGIN_CHECK,
    payload: false,
  };
};
