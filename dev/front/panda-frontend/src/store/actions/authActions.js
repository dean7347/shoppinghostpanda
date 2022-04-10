import { LOGIN_CHECK, SET_USER, SIGN_OUT } from "../types";
import axios from "../../api/axiosDefaults";
import { setError, setLoading } from "./pageActions";
import { getCookie, removeCookie, setCookie } from "../Cookie";

// Create user
export const signup = (data, onError) => {
  return async (dispatch) => {
    try {
    } catch (err) {
      //console.log(err);
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
      let form = new FormData();
      form.append("email", data.account);
      form.append("password", data.password);

      const res = await axios.post("/api/loginv2", form);
      //console.log("res정보");
      //console.log(res.data);
      // //console.log(res.data.data.refreshToken);
      // //console.log(res.data.data.refreshTokenExpirationTime);
      window.localStorage.setItem("accessToken", res.data.accessToken);
      // window.localStorage.setItem("refreshToken", res.data.data.refreshToken);
      // setCookie("at", res.data.data.accessToken, { path: "/" });
      // setCookie("rt", res.data.data.refreshToken, { path: "/" });
      const auth = await axios.post("/api/userauth");
      if (res.data) {
        const userData = res.data;
        //console.log(userData);
        //console.log("어스 :", auth.data);
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
      //console.log("d어스에러");
      //console.log(err);
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
      //console.log("로그아웃 요청 성공");
      await axios.post("/api/user/logoutv2");
      setCookie("loggedIn", "false", { path: "/" });
      setCookie("userId", "", { path: "/" });
      setCookie("panda", "", { path: "/" });
      setCookie("seller", "", { path: "/" });
      removeCookie("loggedIn");
      removeCookie("userId");
      removeCookie("panda");
      removeCookie("seller");

      dispatch({
        type: SIGN_OUT,
      });
    } catch (err) {
      //console.log(err);
      //console.log("로그아웃실패");
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
