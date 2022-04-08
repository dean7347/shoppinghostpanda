import React, {FC, useCallback} from 'react';
import './navbar.css'
import {Link, useHistory, useLocation} from "react-router-dom";
import {notification_dummy, user_menu, panda_menu, seller_menu} from "./navbarTypes";
import {useAuthStore} from "../../../store/authHooks";
import Dropdown from "../../ekan/UI/dropdown/Dropdown";
import Button from "../../ekan/UI/Button";

// const renderNotificationItem = (item: StringObj, index: number) => (
//     <div className="notification-item" key={index}>
//         <i className={item.icon}/>
//         <span>{item.content}</span>
//     </div>
// )

const Navbar = () => {
    const history = useHistory();
    const location = useLocation()
    const user = useAuthStore(state => state.user)
    const signOut = useAuthStore(state => state.signOut)

    console.log('회원: ',user)

    const renderUserToggle = useCallback(() => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                {/*<img src={user.image} alt=""/>*/}
            </div>
            <div className="topnav__right-user__name">
                {'안녕하세요'}
            </div>
        </div>
    ), [])

    const renderUserMenu = useCallback((item, index) => (
        <div key={index}>
            {
                item.link === "/logout" ?
                    <a onClick={() => {
                        signOut()
                    }} key={index}>
                        <div className="notification-item">
                            <i className={item.icon}/>
                            <span>{item.content}</span>
                        </div>
                    </a> :
                    <Link to={item.link} key={index}>
                        <div className="notification-item">
                            <i className={item.icon}/>
                            <span>{item.content}</span>
                        </div>
                    </Link>
            }
        </div>
    ), [signOut, user])

    const renderAuthMenu = useCallback((panda, seller) => {
        if (panda && seller) {
            return user_menu
        }
        if (panda) {
            return panda_menu
        }
        if (seller) {
            return seller_menu
        }
        return user_menu
    }, [user])

    return (
        <nav className="navbar has-shadow">
            {/*{location.pathname === '/' ?*/}
            {/*    <a className="navbar-item" href='/'>*/}
            {/*        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>*/}
            {/*    </a>*/}
            {/*    : <Link className="navbar-item" to={'/'}>*/}
            {/*        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>*/}
            {/*    </Link>*/}
            {/*}*/}
            {location.pathname === '/' ?
                <a className="navbar-brand navbar-logo" href='/'>
                    <span>Panda</span>
                </a>
                : <Link className="navbar-brand" to={'/'}>
                    <span>Panda</span>
                </Link>
            }


            {user ? <div className="navbar-end">
                    <div className="navbar-menu">
                        <span className="mr-3">
                            <Dropdown
                                customToggle={() => renderUserToggle()}
                                contentData={renderAuthMenu(user.panda, user.seller)}
                                renderItems={(item, index) => renderUserMenu(item, index)}
                            />
                        </span>
                        {/*<span className="mr-3">*/}
                        {/*    <Dropdown*/}
                        {/*        icon='bx bx-bell'*/}
                        {/*        badge='0'*/}
                        {/*        contentData={notification_dummy}*/}
                        {/*        renderItems={(item: StringObj, index: number) => renderNotificationItem(item, index)}*/}
                        {/*        renderFooter={() => <Link to='/'>View All</Link>}*/}
                        {/*    />*/}
                        {/*</span>*/}

                    </div>
                </div> :
                <div className="navbar-end">
                    <div className="navbar-menu">
                        <div className="buttons">
                            <Button text="회원가입" onClick={() => history.push('/signup')} className="is-primary"/>
                            <Button text="로그인" onClick={() => history.push('/signin')}/>
                        </div>
                    </div>
                </div>
            }

        </nav>
    );
};

export default Navbar;
