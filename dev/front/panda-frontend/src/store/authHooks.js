import create from "zustand";
import axios from "../api/axiosDefaults";
import { useWindowStore } from "./windowHooks";

export const useAuthStore = create((set) => ({
  user: null,
  signIn: async (signInData, onError) => {
    try {
      useWindowStore.setState({
        loading: true,
      });
      let form = new FormData();
      form.append("email", signInData.account);
      form.append("password", signInData.password);

      const { data } = await axios.post("/api/loginv2", form);
      if (data) {
        //console.log('로그인데이타: ', data)
        set({ user: data });
        useWindowStore.setState({
          loading: false,
        });
      }
    } catch (err) {
      console.error(err);
      onError();
      useWindowStore.setState({
        error: "아이디 비번 다시 확인바람",
        loading: false,
      });
    }
  },
  signOut: async () => {
    try {
      await axios.post("/api/user/logoutv2");
      set({ user: null });
    } catch (err) {
      console.error(err);
      alert("로그아웃 실패");
    }
  },
  signUp: () => {},
  reIssue: () => onTokenRefresh(),
}));

// 토큰 재발급 함수
export const onTokenRefresh = async () => {
  try {
    const { data } = await axios.post("/api/reissuev2");
    console.log(data);
    if (data.success) {
      useAuthStore.setState({
        user: data,
      });
    } else {
      return Promise.reject();
    }
  } catch (err) {
    // throw new Error("리이슈 실패");
    return Promise.reject(err);

    console.error("토큰 재발급 실패", err);
    // 실패 처리
  }
};
