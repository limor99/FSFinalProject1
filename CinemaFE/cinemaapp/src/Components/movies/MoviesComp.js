import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MoviesComp(props) {
    
    const movies = useSelector( state => state.movies);
    //const counter = useSelector( state => state.counter);
    //console.log('movies: ' + movies.length)
        
    return (
        
      <div className="App">
        All Movies:

        <div>
            {
                movies.map((m, index) =>{
                    return <li key={index} >{m.name}</li>
                })
            }

        </div>
    </div>
    );
  }
  
  export default MoviesComp;