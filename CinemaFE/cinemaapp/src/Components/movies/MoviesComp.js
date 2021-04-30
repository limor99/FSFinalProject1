import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import MovieComp from './MovieComp';
import MovieMenu from './menu/MovieMenu';

function MoviesComp(props) {
    //const movies = useSelector( state => state.movies);
    const moviesSubscribers = useSelector(state => state.moviesSubscribers);
    const [movieResult, setMoviesResult] = useState(moviesSubscribers);
    
    const search = (e) =>{
        let search = e.target.value;

        let result = moviesSubscribers.filter(ms => ms.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
        setMoviesResult(result);
    }  
    
    useEffect(() => {
        let selectedMovieId = props.match.params.id;
        if(selectedMovieId != undefined){
            let selectedMovie = movieResult.filter(mr => mr._id === selectedMovieId);
            if(selectedMovie.length > -1){
                setMoviesResult(selectedMovie);
            }
        }
        
    }, [])

    return (
        
      <div className="App">
        <MovieMenu/>
        <input type="text"  onChange={e => search(e)}></input>

        All Movies:

        <div>
            
            {    
                movieResult.map(movie =>{
                    return <MovieComp key={movie.id} movieSubscribers={movie}/>
                })
            }

        </div>
    </div>
    );
  }
  
  export default MoviesComp;