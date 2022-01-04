import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {setError} from "../store/actions/pageActions";
import {signin} from "../store/actions/authActions";
import Message from "../components/ekan/UI/Message";
import Input from "../components/ekan/UI/Input";
import Button from "../components/ekan/UI/Button";

const SignIn = (props) => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.page);
    const { loggedIn } = useSelector((state) => state.auth);

    console.log(props)

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    useEffect(()=> {
        const {history, location: {state}} = props
        if(loggedIn){
            if (state && state.next){
                history.push(state.next)
            }else{
                history.goBack()
            }
        }
    },[loggedIn, props])

    const submitHandler = (e) => {
        e.preventDefault();
        if(error) {
            dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signin({ account, password }, () => setLoading(false)));
    }

    return(
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
                    <p><Link to="/forgot-password">Forgot password ?</Link></p>
                    <Button text={loading ? "Loading..." : "Sign In"} className="is-primary is-fullwidth mt-5" disabled={loading} />
                </form>
            </div>
        </section>
    );
}

export default SignIn;
