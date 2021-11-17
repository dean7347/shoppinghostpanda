import client from "./client";

//로그인
export const login = ({ account, password }) =>
  client.post("/authenticate", { username: account, password });

//회원가입
export const register = ({ account, password }) =>
  client.post("/signup", { email: account, password });

//로그인 상태 확인
export const check = () => client.get("/auth/check");

//로그아웃
export const logout = () => client.get("/user/logout");
