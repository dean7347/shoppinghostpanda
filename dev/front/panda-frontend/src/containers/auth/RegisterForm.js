import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { withRouter } from "react-router-dom";

/**이코드는 on submit 이벤트가 발생하면
 * register함수에 현재 username과 password를 파라미터로 넣어서액션을 디스패치함
 * 그리고 사가에서 API요청 처리
 * 이에대한 결과는 auth/authError을통해 조회
 *
 * 결과를 얻었을때 특정 작업을 하기위해 useEffect를사용
 * 안의 함수는 auth혹은 authError 값중 무엇이 유효한지에따라 다른작업
 */
const RegisterForm = ({ history }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  //폼등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { account, password, passwordConfirm } = form;
    //하나라도 비어있다면
    if ([account, password, passwordConfirm].includes("")) {
      setError("빈 칸을 모두 입력하세요");
      return;
    }

    //비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(
        changeField({ form: "register", key: "passwordConfirm", value: "" })
      );
      return;
    }
    dispatch(register({ account, password }));
  };

  //컴포넌트가 처음 렌더링 될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  //회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      //계정명이 이미 존재할 때
      if (authError.response.status === 409) {
        setError("이미 존재하는 계정 명입니다");
        return;
      }
      //기타이유
      setError("회원가입 실패. 잠시후 다시 시도 해 주세요");
      return;
    }

    if (auth) {
      alert("회원가입 성공");
      window.location.replace("/login");

      // history.go("/login");
    }
  }, [auth, authError, dispatch]);

  //user값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      history.push("/"); //홈화면으로 이동
      // //console.log("환영합니다!");
      // 로그인 상태 유지를 위해 브라우저에 내장되어 있는 localStorage를 사용
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (e) {
        // //console.log("localStorage is not working");
      }
    }
  }, [history, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
