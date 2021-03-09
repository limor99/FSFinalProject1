import React  from 'react';
import {useDispatch} from 'react-redux';

import CompB from '../Components/CompB'
import CompC from '../Components/CompC'

function CompA(props) {
    const dispatch = useDispatch();
    
      
     
    return (
        
      <div className="App">
    
Comp A
        <div>
     
        <button onClick={ () =>{
            console.log("in counter")
            dispatch({
                type : "LoadData"
            })
        } }>+</button>

        <br/>

        <CompC/>

        </div>
    


        
      </div>
    );
  }
  
  export default CompA;