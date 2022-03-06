import React from "react";
import './statuscard.css'
import { Link } from 'react-router-dom'


const StatusCard = ({link, icon, count, title, onClick}) => {
    return (
        <Link to={link}>
            <div className="status-card" id={title} onClick={onClick}>
                <div className="status-card__icon">
                    <i className={icon}></i>
                </div>
                <div className="status-card__info">
                    <h4>{count}</h4>
                    <span>{title}</span>
                </div>
            </div>
        </Link>

    )
}

export default StatusCard
