import React, {useState} from 'react';
import '../buyer/buyerIndex.css'
import MyPageRoutes from "../MyPageRoutes";
import {Route} from "react-router-dom";
import {pandaSidebarItems} from "./pandaTypes";
import Sidebar from "../../../sections/Sidebar";
import {getCookie} from "../../../../../store/Cookie";
import Redirect from "react-router-dom/es/Redirect";

const PandaIndex = () => {
    const [panda] = useState(getCookie('panda'))

    return (
        <Route render={(props) => (
            panda === 'true' ?
                <div className={`layout theme-mode-light theme-color-red`}>
                    <Sidebar sidebarItems={pandaSidebarItems} {...props}/>
                    <div className="layout__content">
                        <div className="layout__content-main">
                            <MyPageRoutes/>
                        </div>
                    </div>
                </div> :
                <Redirect to={'/panda'}/>
        )}/>
    );
};

export default PandaIndex;
