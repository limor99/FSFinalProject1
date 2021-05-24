import React  from 'react';
import { Link } from 'react-router-dom';

import './WelcomeComp.css';


function WelcomeComp() {
    return (
        <div className="App">
            <div className="name">MovieX</div>
            <div className="toLogin">
                <Link to="/login">Let's start</Link>
            </div>
        </div>
    );
  }
  
  export default WelcomeComp;