import React, { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MovieComp from './MovieComp';
import MovieMenu from './menu/MovieMenu';

function MoviesComp(props) {
    const movies = useSelector( state => state.movies);
    //const moviesSubscribers = useSelector(state => state.moviesSubscribers);
    const [movieResult, setMoviesResult] = useState(movies);
    const [hasPermission, setHasPermission] =useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('View Movies')))
    
    const history = useHistory();
    const search = (e) =>{
        let search = e.target.value;

        let result = movies.filter(m => m.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
        setMoviesResult(result);
    }  

    useEffect(() => {
        setMoviesResult(movies);
    }, [movies])
    
    useEffect(() => {
        
            let selectedMovieId = props.match.params.id;
            if(selectedMovieId != undefined){
                let selectedMovie = movieResult.filter(mr => mr._id === selectedMovieId);
                if(selectedMovie.length > 0){
                    setMoviesResult(selectedMovie);
                }
            }
        
        
        
    }, [])

   

    return (
        
      <div className="App">
        <MovieMenu/>

        {
            !hasPermission ? 
            <div>You have no permission to view movies</div>
            :
            <div>
                <input type="text"  onChange={e => search(e)}></input>
         
                All Movies:

                {    
                    movieResult.map(movie =>{
                        return <MovieComp key={movie._id} movie={movie}/>
                    })
                }
            </div>
        }

    </div>
    
    );
  }
  
  export default MoviesComp;