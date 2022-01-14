import React from 'react';
import '../buyer/buyerIndex.css'
import MyPageRoutes from "../MyPageRoutes";
import {Route} from "react-router-dom";
import {pandaSidebarItems} from "./pandaTypes";
import Sidebar from "../../../sections/Sidebar";

const PandaIndex = () => {
    return (
        <Route render={(props) => (
            <div className={`layout theme-mode-light theme-color-red`}>
                <Sidebar sidebarItems={pandaSidebarItems} {...props}/>
                <div className="layout__content">
                    <div className="layout__content-main">
                        <MyPageRoutes/>
                    </div>
                </div>
            </div>
        )}/>
    );
};

export default PandaIndex;
