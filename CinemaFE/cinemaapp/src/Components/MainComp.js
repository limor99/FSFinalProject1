import React, { useEffect, useState } from 'react';

import usersUtil from '../Utils/usersUtil';

import Header from '../Components/HeaderComp';
import Movies from '../Components/movies/MoviesComp';

function MainComp(props) {
  const [msg, setMsg] = useState('Choose Action')
  
  useEffect(() => {
    if( props.location.state !== undefined){
      let msg = props.location.state.msg;
      setMsg(msg);
    }
  }, [])

 async function test(){
    let token = sessionStorage.getItem("id");
    /*let test ={
      foo: "foo"
  }*/

  let resp = await usersUtil.test(token);
  
  if(resp.success){
      console({resp})
  }
  else{
    console.log("ERRor")
  }

  }

  return (
    <div className="App">
      
      {sessionStorage.getItem("userName") ? <Header userName={sessionStorage.getItem("userName")}/> : ''}
      <h1>Main page</h1>

      {msg}


<button type="button" onClick={test} >test</button>

      
    </div>
  );
}
  
  export default MainComp;