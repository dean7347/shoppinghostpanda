import React from 'react';
import logo from "../../../assets/images/logo.png";
import {Link} from "react-router-dom";

const PandaSidebar = ({location, sidebarItems}) => {

    const activeItem = sidebarItems.findIndex((item) => item.route === location.pathname)

    return (
        <>
            <div className='sidebar'>
                <div className="sidebar__logo">
                    <img src={logo} alt="company logo"/>
                </div>
                {
                    sidebarItems.map((item, index) => (
                        <Link to={item.route} key={index}>
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                                active={index === activeItem}
                            />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

const SidebarItem = (props) => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active} `}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

export default PandaSidebar;
