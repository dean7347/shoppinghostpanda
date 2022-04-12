import axios from "axios";
import { getConfigFileParsingDiagnostics } from "../../node_modules/typescript/lib/typescript";
import { onTokenRefresh } from "../store/authHooks";
// 타임아웃
axios.defaults.timeout = 2500;
// 요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    // 요청 보내기 전
    return config;
  },
  (error) => {
    // //console.log(error);
    return Promise.reject(error);
  }
);
// 응답 인터셉터
axios.interceptors.response.use(
  (response) => {
    // 응답 로직 작성
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 406) {
      try {
        await onTokenRefresh();
        // console.log(onTokenRefresh());
        return axios(config);
      } catch (err) {
        console.error("재발급 실패", err);
        if (window.confirm("로그인이 필요한 서비스입니다. 이동하시겠습니까?")) {
          window.location.replace("/signin");
        }
      }
    }
    if (status === 401) {
      // 추후에 401 필요하면 추가
      alert("권한이 없는 요청입니다");
    }
    if (status === 404) {
      alert(
        "알수 없는 오류가 발생했습니다 해당 상황이 계속된다면 문의해 주세요"
      );
    }
    return Promise.reject(error);
  }
);
export default axios;
