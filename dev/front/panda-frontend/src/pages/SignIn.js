import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useWindowStore } from "../store/windowHooks";
import { useAuthStore } from "../store/authHooks";
import Button from "../components/ekan/UI/Button";
import Input from "../components/ekan/UI/Input";
import Message from "../components/ekan/UI/Message";

const SignIn = (props) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);
  const user = useAuthStore((state) => state.user);
  const error = useWindowStore((state) => state.error);
  const setError = useWindowStore((state) => state.setError);

  useEffect(() => {
    return () => {
      if (error) {
        setError("");
      }
    };
  }, [error]);

  useEffect(() => {
    const {
      history,
      location: { state },
    } = props;
    if (user) {
      if (user.success) {
        if (state && state.next) {
          history.push(state.next);
        } else {
          history.push("/");
        }
      } else {
        setError(user.message);
      }
    }
  }, [user, props]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (error) {
      setError("");
    }
    setLoading(true);
    signIn({ account, password }, () => setLoading(false));
  };

  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is-size-2 mb-3">Sign In</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type="danger" msg={error} />}
          <Input
            type="email"
            name="email"
            value={account}
            onChange={(e) => setAccount(e.currentTarget.value)}
            placeholder="Email address"
            label="Email address"
          />
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
            label="Password"
          />
          <p>
            <Link to="/find_id_pw">ID/PW찾기</Link>
          </p>
          <Button
            text={loading ? "Loading..." : "Sign In"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
};

export default SignIn;
