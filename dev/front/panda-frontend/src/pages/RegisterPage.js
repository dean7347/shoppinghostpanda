import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import RegisterForm from "../containers/auth/RegisterForm";
const WritePage = () => {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
};

export default WritePage;
