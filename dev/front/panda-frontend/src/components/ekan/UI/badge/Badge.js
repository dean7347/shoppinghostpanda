import React from "react";
import './badge.css'

const Badge = ({type, content}) => {
    return (
        <span className={`tableBadge badge-${type}`}>
            {content}
        </span>
    )
}

export default Badge
