import React, {FC} from 'react';
import '../buyer/buyerIndex.css'
import MyPageRoutes from "../MyPageRoutes";
import {Route} from "react-router-dom";
import Sidebar from "../../../sections/Sidebar";
import {adminSidebarItems} from "./adminTypes";

const AdminIndex = () => {

    return (
        <Route render={(props) => (
            <div className={`layout theme-mode-dark theme-color-red`}>
                <Sidebar sidebarItems={adminSidebarItems} {...props}/>
                <div className="layout__content">
                    <div className="layout__content-main">
                        <MyPageRoutes/>
                    </div>
                </div>
            </div>
        )}/>
    );
};

export default AdminIndex;
