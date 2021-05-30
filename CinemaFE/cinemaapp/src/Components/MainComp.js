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
    <div className='App main'>
      
      {msg}
      <br/>
      Diagrams and graph are comin soon....
    </div>
  );
}
  
export default MainComp;