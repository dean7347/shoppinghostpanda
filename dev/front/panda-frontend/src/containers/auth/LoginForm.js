import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter } from "react-router-dom";
import { check } from "../../modules/user";
import axios from "../../api/axiosDefaults";

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  //인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  //폼등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { account, password } = form;
    dispatch(login({ account, password }));
  };

  //컴포넌트가 처음 렌더링 될 때 form을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      // //console.log("오류발생");
      // //console.log(authError);
      setError("로그인 실패");
      return;
    }
    if (auth) {
      // //console.log(auth);
      // //console.log("로그인 성공");
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push("/");
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
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
