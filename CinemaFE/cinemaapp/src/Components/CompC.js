import React from 'react';
import {useSelector} from 'react-redux';

function CompC(props) {
    
    const data = useSelector( state => state.movies);
         
    return (
        
      <div className="App">
        <br/>

        Mvoies: {data.length}

    


        
      </div>
    );
  }
  
  export default CompC;