import React, { useEffect, useState } from 'react';

import Header from '../Components/HeaderComp';

function MainComp(props) {
  const [msg, setMsg] = useState('Choose Action')
  
  useEffect(() => {
    if( props.location.state !== undefined){
      let msg = props.location.state.msg;
      setMsg(msg);
    }
  }, [])

 return (
    <div className='main'>
      
      <h1>Main page</h1>

      {msg}
    </div>
  );
}
  
export default MainComp;