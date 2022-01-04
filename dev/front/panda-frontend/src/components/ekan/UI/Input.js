import React from "react";

const Input = ({type = 'text', placeholder, value, name, onChange, label}) => {
    return (
        <div className="field">
            <div className="control">
                <label htmlFor={name}>{label}</label>
                <input
                    className="input"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    required
                />
            </div>
        </div>
    )
}

export default Input
