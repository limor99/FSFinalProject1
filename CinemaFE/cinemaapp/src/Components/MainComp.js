import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './HeaderComp';

function MainComp(props) {
  const [msg, setMsg] = useState('Choose Action');
  const userFullName = useSelector(state => state.userFullName);
  
  useEffect(() => {
    if( props.location.state !== undefined){
      let msg = props.location.state.msg;
      setMsg(msg);
    }
  }, [])

 return (
    <div className='App main'>
      {userFullName !== '' ? <Header userFullName={userFullName} /> : ''}
      
      {msg}
      <br/>
      Diagrams and graph are coming soon....
    </div>
  );
}
  
export default MainComp;