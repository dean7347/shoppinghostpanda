import React from "react";

const Button = ({text, className, onClick, type, disabled}) => {
    return (
        <button type={type} className={`button ${className}`} onClick={onClick} disabled={disabled}
        >{text}</button>
    )
}

export default Button;
