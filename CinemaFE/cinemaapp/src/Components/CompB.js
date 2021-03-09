import React from 'react';
import {useSelector} from 'react-redux';

function CompB(props) {
    
    const data = useSelector( state => state.counter);
         
    return (
        
      <div className="App">
        <br/>

        Counter: {data}

    


        
      </div>
    );
  }
  
  export default CompB;