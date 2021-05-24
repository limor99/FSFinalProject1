import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import './HeaderComp.css';

function HeaderComp(props){
    
    return(
        <div className='header'>
             <AppBar position="fixed">
                <Toolbar>
                <ul>
                    <li>logo</li>&nbsp;&nbsp;
                    <li><Link to='movies'>Movies</Link></li>&nbsp;&nbsp;
                    <li><Link to='subscriptions'>Subscriptions</Link></li>&nbsp;&nbsp;
                    <li><Link to='users'>User's Management</Link></li>&nbsp;&nbsp;
                    <li>{props.userFullName !== '' ? `Hello ${props.userFullName}` : ''}</li>&nbsp;&nbsp;
                </ul>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default HeaderComp;