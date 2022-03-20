import axios from "../../api/axiosDefaults";

// axios 인스턴스로 나중에 API 클라이언트에 공통된 설정을 쉽게 넣어줄 수 있따
//인스턴스를 만들지 않아도 되지만  만들지 않으면
//애플리케이션에서 발생하는 모든 요청에 대해 설정하게 되므로 또다른 API서버를 사용하려할 때 곤란해 질 수있다

const client = axios.create();
export default client;

/*
 글로벌 설정 예시;
 //API주소를 다른곳으로 사용함
 client.defaults.baseURL='https://external-api-server.com/'

 //헤더 설정
 client.defaults.headers.common['Authrization'] = 'Bearer a1b2c3d4';

 //인터셉터 설정
 axios.intercepter.response.use(\
    response=>{
        //요청 성공 시 특정 작업 수행
        return response;
    },
    error =>{
        //요청 실패 시 특정 작업 수행
        return Promise.reject(error);
    }
})
*/
