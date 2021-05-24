import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import usersUtil from '../../Utils/usersUtil';


function CreateAccountComp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const history = useHistory();

    const createAccount = async (e) =>{
        e.preventDefault();
        let createdUser = {
            username: username,
            password: password
        }

        let resp = await usersUtil.createAccount(createdUser);

        if(resp.success){
            history.push({
                pathname: '/login',
                state: { msg: resp.msg }
            });

        }
        else{
            setMsg(resp.msg);
        }
    }
    return (
        <div className='App'>
            <h1>Create your Account</h1>
            <form onSubmit={e => createAccount(e)}>
            username <br/>
                <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)}></input><br/>
                password <br/>
                <input type="text" value={password} name="password" onChange={(e) => setPassword(e.target.value)}></input><br/>
                <input type="submit"/>
                <br/>
                {msg}
          </form>
            
        </div>
    )
}

export default CreateAccountComp
