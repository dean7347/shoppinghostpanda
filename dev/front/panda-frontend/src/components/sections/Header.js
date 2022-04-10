import React, { FC } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../store/actions/authActions";
import Button from "../ekan/UI/Button";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  return (
    <nav className="navbar is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={"/"}>
            name
          </Link>
          <Link className="navbar-item" to={"/buyer/mypage"}>
            mypage
          </Link>
          <Link className="navbar-item" to={"/panda/dashboard"}>
            pandapage
          </Link>
          <Link className="navbar-item" to={"/seller/dashboard"}>
            sellerpage
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-items">
            {!loggedIn ? (
              <div className="buttons">
                <Button
                  text="회원가입"
                  onClick={() => history.push("/register")}
                  className="is-primary"
                />
                <Button text="로그인" onClick={() => history.push("/signin")} />
              </div>
            ) : (
              <Button text="로그아웃" onClick={logoutClickHandler} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
