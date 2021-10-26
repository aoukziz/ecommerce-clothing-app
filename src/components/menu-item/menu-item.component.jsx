import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, linkUrl}) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div className={`menu-item ${size}`} onClick={() => history.push(`${location.pathname}${linkUrl}`)} >
            <div style={{backgroundImage: `url(${imageUrl})`}} className="background-image" />
             <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
}

export default MenuItem;
