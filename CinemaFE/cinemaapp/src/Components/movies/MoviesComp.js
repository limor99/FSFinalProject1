import React, { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MovieComp from './MovieComp';
import MovieMenu from './menu/MovieMenu';
import { Grid } from '@material-ui/core';

function MoviesComp(props) {
    const movies = useSelector( state => state.movies);
    const [movieResult, setMoviesResult] = useState(movies);
    const [hasPermission, setHasPermission] = useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('View Movies')))
    
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
        
      <div className='movies services'>
          <Grid container direction="column" justify="flex-start" spacing={2}>
              <Grid item xs={12} className='menuLine'>
                  <Grid container justify="flex-start" alignItems="center"  >
                      <Grid item>
                          <MovieMenu/>
                      </Grid>
                      <Grid item>
                          <input type="text"  onChange={e => search(e)}></input>
                      </Grid>
                </Grid>
              </Grid>
        
            
            {
                
                !hasPermission ? 
                <Grid item xs={12}>
                    <div>You have no permission to view movies</div>
                </Grid>
                :
                <Grid item xs={12} className='MoviesBoxes'>
                    <Grid container direction='row' justify="flex-start" alignItems="stretch" spacing={2} className='startAllMovies'>
                        {    
                            movieResult.map(movie =>{
                                return <MovieComp key={movie._id} movie={movie}/>
                            })
                        }
                    </Grid>
                </Grid>
               
            }
            
        </Grid>
    </div>
    
    );
  }
  
  export default MoviesComp;