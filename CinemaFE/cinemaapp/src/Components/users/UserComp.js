import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import UserHeader from './header/UserHeader';

import usersUtil from '../../Utils/usersUtil';

import './UserComp.css';

function UserComp(props) {
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();

    const deleteUser = async (id) =>{
        let response = await usersUtil.deleteUser(id);
        if(response.success){
            dispatch({
                type: "DeleteUser",
                payload: id
            })
        }
        else{
            dispatch({
                type: "UpdateMsg",
                payload: response.msg
            })
        }
    }
    return (
        
        <div className='user'>
            name: {props.user.firstName} {props.user.lastName}<br/>
            usernme: {props.user.username}<br/>
            SessionTimeout: {props.user.sessionTimeOut}<br/>
            Created Date : {props.user.createdDate}<br/>
            permissions : 
            {
                props.user.permissions.map((p, i) =>{
                    let permissionLen = props.user.permissions.length;
                    if(i !== permissionLen-1){
                        return (' ' + p + ',');
                    }
                    else{
                        return (' ' + p);
                    }
                    
                })
            }
            <br/>
            
            <button><Link to={`/user/${props.user.id}`}>Edit</Link></button>
            <input type="button" value="Delete" onClick={() => deleteUser(props.user.id)}/>
        </div>
    )
}

export default UserComp
