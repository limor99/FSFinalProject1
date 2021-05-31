import React, { useEffect }  from 'react';
import { Link, useHistory } from 'react-router-dom';

import './WelcomeComp.css';


function WelcomeComp() {
    const userFullName = localStorage.getItem('userFullName');
    const history = useHistory();

    useEffect(() => {
        if(userFullName !== null && userFullName !== ''){
          history.push("/main");
        }
      })
  
    return (
        <div className="App welcome">
            <div className="name">MovieX</div>
            <div className="toLogin">
                <Link to="/login">Let's start</Link>
            </div>
        </div>
    );
  }
  
  export default WelcomeComp;