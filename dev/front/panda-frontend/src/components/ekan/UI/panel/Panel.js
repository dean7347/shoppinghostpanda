import React from 'react';
import './panel.css'

const Panel = ({title, className, children}) => {
    return (
        <div className="container panel-container">
            <article className={`panel ${className}`}>
                <p className="panel-heading">{title}</p>
                {children}
            </article>

        </div>
    );
};

export default Panel;
