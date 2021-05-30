import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import usersUtil from '../Utils/usersUtil';

import './LoginComp.css';


function LoginComp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    async function login(e) {
    e.preventDefault();
    let userLogin ={
          username: username,
          password: password,
      }

      let resp = await usersUtil.login(userLogin);
      
      if(resp.success){
          sessionStorage.setItem("id", resp.token);
                   
          dispatch({
            type : "updateUserFullName",
            payload : resp.userFullName
          });

          const permissions = resp.permissions;
          sessionStorage.setItem('permissions', permissions);

          history.push("/main");    
      }
      else{
          setMsg(resp.message);
      }
    }

   
    
    return (
        
      <div className='App loginPage'>
          <div className='milkDiv loginForm'>
          {props.location.state != null ? props.location.state.msg : '' }
            <form onSubmit={e => login(e)}>
              <input type='text' className='roundedField' value={username} name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input><br/>
              <input type='text' className='roundedField' value={password} name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input><br/>
              <input type='submit' value='GET STARTED' className='roundedBtn'/><br/>

              <Link to='/createAccount'>Create Account</Link><br/>
              
              <br/>
              {msg}
            </form>
          </div>
      </div>
    );
  }
  
  export default LoginComp;