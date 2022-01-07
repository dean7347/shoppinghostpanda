import React from 'react'

import './buyerMyPage.css'
import {buyerSidebarItems} from "./buyerTypes";
import { BrowserRouter, Route } from 'react-router-dom'
import Sidebar from "../../../sections/Sidebar";
import MyPageRoutes from "../MyPageRoutes";

const BuyerMyPage = () => {

    return (
            <Route render={(props) => (
                <div className={`layout theme-mode-light theme-color-blue`}>
                    <Sidebar sidebarItems={buyerSidebarItems} {...props}/>
                    <div className="layout__content">
                        <div className="layout__content-main">
                            <MyPageRoutes/>
                        </div>
                    </div>
                </div>
            )}/>
    )
}

export default BuyerMyPage
