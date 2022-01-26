import React, {FC, useState} from 'react';
import './navbar.css'
import {Link, useHistory} from "react-router-dom";
import {notification_dummy, user_menu, panda_menu, seller_menu} from "./navbarTypes";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../../../store/actions/authActions";
import Dropdown from "../../ekan/UI/dropdown/Dropdown";
import {getCookie} from "../../../store/Cookie";
import Button from "../../ekan/UI/Button";

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const Navbar= () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const {loggedIn} = useSelector((state) => state.auth);
    const [userId] = useState(getCookie('userId'))
    const [panda] = useState(getCookie('panda'))
    const [seller] = useState(getCookie('seller'))

    const renderUserToggle = () => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                {/*<img src={user.image} alt=""/>*/}
            </div>
            <div className="topnav__right-user__name">
                {userId}
            </div>
        </div>
    )

    const renderUserMenu = (item, index) => (
        <div key={index}>
            {
                item.link === "/logout" ?
                    <a onClick={() => {
                        dispatch(signout())
                    }} key={index}>
                        <div className="notification-item">
                            <i className={item.icon}></i>
                            <span>{item.content}</span>
                        </div>
                    </a> :
                    <Link to={item.link} key={index}>
                        <div className="notification-item">
                            <i className={item.icon}></i>
                            <span>{item.content}</span>
                        </div>
                    </Link>
            }
        </div>
    )

    const renderAuthMenu = (panda, seller) => {
        if(panda === "true" && seller === "true") {
            return user_menu
        }
        if(panda === "true"){
            return panda_menu
        }
        if(seller === "true"){
            return seller_menu
        }
        return user_menu
    }

    return (
        <nav className="navbar is-spaced has-shadow">
            <Link className="navbar-item" to={'/'}>
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </Link>

            {loggedIn ? <div className="navbar-end">
                    <div className="navbar-menu">
                        <span className="mr-3">
                            <Dropdown
                                customToggle={() => renderUserToggle()}
                                contentData={renderAuthMenu(panda, seller)}
                                renderItems={(item, index) => renderUserMenu(item, index)}
                            />
                        </span>
                        <span className="mr-3">
                            <Dropdown
                                icon='bx bx-bell'
                                badge='12'
                                contentData={notification_dummy}
                                renderItems={(item, index) => renderNotificationItem(item, index)}
                                renderFooter={() => <Link to='/'>View All</Link>}
                            />
                        </span>

                    </div>
                </div> :
                <div className="navbar-end">
                    <div className="navbar-menu">
                        <div className="buttons">
                            <Button text="회원가입" onClick={() => history.push('/signup')} className="is-primary" />
                            <Button text="로그인" onClick={() => history.push('/signin')}/>
                        </div>
                    </div>
                </div>
            }

        </nav>
    );
};

export default Navbar;