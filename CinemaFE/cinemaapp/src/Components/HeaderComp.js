import React from 'react'
import './HeaderComp.css';
import { Link } from 'react-router-dom';




function HeaderComp(props){
    
    return(
        <div>
            <ul>
                <li>logo</li>&nbsp;&nbsp;
                <li><Link to='movies'>Movies</Link></li>&nbsp;&nbsp;
                <li><Link to='subscriptions'>Subscriptions</Link></li>&nbsp;&nbsp;
                <li><Link to='users'>User's Management</Link></li>&nbsp;&nbsp;
                <li>{props.userFullName !== '' ? `Hello ${props.userFullName}` : ''}</li>&nbsp;&nbsp;
            </ul>
        </div>

    )
}

export default HeaderComp;