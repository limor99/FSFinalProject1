import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import './HeaderComp.css';

const useStyles = makeStyles({
    root: {
      backgroundColor: 'black', 
      borderBottom: '1px solid red',
      color: 'red'
     
    },
  });

function HeaderComp(props){
    const classes = useStyles();
    const history = useHistory();

    const logout = () =>{
        localStorage.clear();
        history.push('/login');

    }
    
    return(
        <div>
             <AppBar className={classes.root} position="fixed" >
                <Toolbar>
                <div  className='menu'>
                    <div>
                        <ul>
                            <li>logo</li>&nbsp;&nbsp;
                            <li><Link to='movies'>Movies</Link></li>&nbsp;&nbsp;
                            <li><Link to='subscriptions'>Subscriptions</Link></li>&nbsp;&nbsp;
                            <li><Link to='users'>User's Management</Link></li>&nbsp;&nbsp;
                            
                        </ul>
                    </div>
                
                    <div className='logout'>
                        <b>
                            {props.userFullName !== '' ? `Hello ${props.userFullName} | ` : ''} 
                        </b>
                        {props.userFullName !== '' ? <a onClick={() => logout()}>
                        &nbsp;Logout
                        </a>  : ''} 

                      

                    
                    </div>
                </div>
                </Toolbar>
            </AppBar>
        </div>

    )
}

export default HeaderComp;