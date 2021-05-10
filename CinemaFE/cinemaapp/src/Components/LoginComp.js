import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import usersUtil from '../Utils/usersUtil';


function LoginComp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    
    /*
    async function login(e) 
    {
      e.preventDefault();
      let userLogin ={
            username: username,
            password: password,
        }

        let resp = await usersUtil.login(userLogin);
        
        if(resp.success){
            sessionStorage.setItem("userData", resp.token);
            sessionStorage.setItem("userName", resp.userNNF);
            history.push("/main");    
        }
        else{
            setMsg(resp.message);
        }
    }
    */

   async function login(e) {
    e.preventDefault();
    let userLogin ={
          username: username,
          password: password,
      }

      let resp = await usersUtil.login(userLogin);
      
      if(resp.success){
          sessionStorage.setItem("id", resp.token);
          //sessionStorage.setItem("userFullName", resp.userFullName)
         
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

   const createAccount = () =>{
     history.push("/createAccount");
   }
    
    return (
        
      <div className="App">
          <h1>LOGIN page</h1>

          {props.location.state != null ? props.location.state.msg : '' }

          

          <form onSubmit={e => login(e)}>
        username <br/>
            <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)}></input><br/>
            password <br/>
            <input type="text" value={password} name="password" onChange={(e) => setPassword(e.target.value)}></input><br/>
            <input type="submit"/>
            <button onClick={createAccount}>Create Account</button>
          <br/>
            {msg}
          </form>
      </div>
    );
  }
  
  export default LoginComp;