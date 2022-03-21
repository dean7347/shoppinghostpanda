import create from "zustand";
import axios from "../api/axiosDefaults";

export const useAuthStore = create((set) => ({
  user: null,
  signIn: async (id, pw) => {
    try {
      let form = new FormData();
      form.append("email", id);
      form.append("password", pw);

      const { data } = await axios.post("/api/loginv2", form);
      if (data) {
        set({ user: data });
      }
    } catch (err) {
      console.error(err);
      // 로그인 실패 처리
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
  reIssue: () => onTokenRefresh(),
}));

// 토큰 재발급 함수
export const onTokenRefresh = async () => {
  try {
    console.log("리프래시중임");
    const { data } = await axios.post("/api/reissuev2");
    console.log("??", data);
    if (data) {
      console.log("받아오기 성공");
      useAuthStore.setState({
        user: data,
      });
    }
  } catch (err) {
    console.error("리프레시에러", err);
    // 실패 처리
  }
};
