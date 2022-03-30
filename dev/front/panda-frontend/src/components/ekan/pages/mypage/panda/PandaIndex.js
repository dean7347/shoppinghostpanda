import React from 'react';
import '../buyer/buyerIndex.css'
import MyPageRoutes from "../MyPageRoutes";
import {Route} from "react-router-dom";
import {pandaSidebarItems} from "./pandaTypes";
import Sidebar from "../../../sections/Sidebar";
import Redirect from "react-router-dom/es/Redirect";
import {useAuthStore} from "../../../../../store/authHooks";

const PandaIndex = () => {
    const {panda} = useAuthStore(state => state.user)

    return (
        <Route render={(props) => (
            panda ?
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
