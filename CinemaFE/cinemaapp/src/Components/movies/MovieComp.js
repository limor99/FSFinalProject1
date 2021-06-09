import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import moment from 'moment';

import './MovieComp.css';
import moviesUtil from '../../Utils/movieUtil';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Paper';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


import { green } from '@material-ui/core/colors';



function MovieComp(props) {
    const movieSubscribers = useSelector(state => state.moviesSubscribers.filter(stm => stm.id === props.movie._id)[0].subscribersToMovie);
    const members = useSelector(state => state.members);
    const [hasPermissionToDelete, setHasPermissionToDelete] = useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('Delete Movies')))
    const [hasPermissionToUpdate, setHasPermissionToUpdate] = useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('Update Movies')))
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteMovie = async (movieId) =>{
        let response = await moviesUtil.deleteMovie(movieId);
        if(response.success){
            dispatch({
                type: "DeleteMovie",
                payload: movieId
            })
        }
        //else{
            dispatch({
                type: "UpdateMsg",
                payload: response.msg
            })
       // }

        history.push('/movies');
    
    }

    return (
        
            <Grid item xs={12} sm={6} md={4}>
                <Paper className="movie">
                    <Grid container direction='column' justify="center" spacing={1}>
                        <Grid item  sm={12}>
                            <Grid container justify='flex-start'  alignItems="center">
                                <Grid item>
                                    <Box m={1}><img className="imgSize" src={props.movie.image.medium} alt={props.movie.name}/></Box>
                                </Grid>
                                <Grid item>
                                    <Grid container direction='column' className="movieDetails">
                                        <Grid item>
                                            {props.movie.name} 
                                        </Grid>
                                        <Grid item >
                                            {props.movie.premiered.slice(0, 4)}
                                        </Grid>
                                        <Grid item>
                                            <div className='genres'>
                                                {props.movie.genres.join()} 
                                            </div>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12}>
                            {
                                movieSubscribers.length === 0 ?
                                <Box className='subscribersList'>
                                    <ul  className='subscribersNameList'>
                                        <li className="movieDetails">There are no subscribers for this movie</li>
                                    </ul>
                               </Box>
                                :
                                <Box className='subscribersList'>
                                    <ul className='subscribersNameList'>
                                    {
                                        movieSubscribers.map(ms => {
                                            return <li className='listElement' key={ms.id}><Link to={`/subscriptions/${ms.id}`}>{members.filter(m => m._id === ms.id)[0].name}</Link>, <div className='subscriptionDate'>{moment(ms.dateWatched).format('YYYY')}</div></li>
                                        })
                                    }
                                    </ul>
                                </Box>
                                
                            }
                            
                        </Grid>

                        <Grid item sm={12}>
                            <Box m={1}>
                                {
                                    hasPermissionToUpdate ?
                                        <Button size="small" color="primary" variant="outlined"><Link to={`/movie/${props.movie._id}`}>Edit</Link></Button>
                                    :
                                    <Button size="small" color="primary" variant="outlined" disabled><Link to={`/movie/${props.movie._id}`}>Edit</Link></Button>

                                }
                                <Button size="small" className='deleteBtn' color="primary" variant="outlined" disabled = {!hasPermissionToDelete} >
                                    <a onClick={() => deleteMovie(props.movie._id)}>Delete</a>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>


        
    )
}

export default MovieComp
