import React from 'react';

import usersUtil from '../Utils/usersUtil';

import Header from '../Components/HeaderComp';
import Movies from '../Components/movies/MoviesComp';

function MainComp() {

 async function test(){
    let token = sessionStorage.getItem("user");
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




<button type="button" onClick={test} >test</button>

      
    </div>
  );
}
  
  export default MainComp;