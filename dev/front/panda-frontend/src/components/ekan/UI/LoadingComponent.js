import React from 'react';
import ReactLoading from "react-loading";

const LoadingComponent= ({type, height, width}) => {
    return (
        <div className="component-loader-wrapper">
            <ReactLoading type={type} color={"#00d1b2"} height={height} width={width}/>
        </div>
    );
};

export default LoadingComponent;
