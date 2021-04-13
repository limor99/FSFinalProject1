import React from 'react';
import {Link } from 'react-router-dom';

import MemberSubscriptions from './MemberSubscriptionsComp';


import './MemberComp.css'

function MemberComp(props) {

    const deleteMember = (memberId) =>{


    }

    

    return (
        <div className="member">
           <h4>{props.member.name}</h4>
           Email: {props.member.email} <br/>
           City: {props.member.city} <br/>

           <button><Link to={`/subscription/${props.member._id}`}>Edit</Link></button>
           <input type="button" value="Delete" onClick={() => deleteMember(props.member._id)}/>

            <MemberSubscriptions id={props.member._id} />
            
        </div>
    )
}

export default MemberComp
