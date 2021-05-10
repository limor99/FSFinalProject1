import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import moment from 'moment';

import './MovieComp.css';
import moviesUtil from '../../Utils/movieUtil';


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
        <div className="movie">
            name: {props.movie.name} <br/>
            year: {props.movie.premiered.slice(0, 4)} <br/>
            genres: {props.movie.genres.join()} <br/>
            image: <img className="imgSize" src={props.movie.image.medium}/> <br/>
            {
                 movieSubscribers.length === 0 ?
                 <div>There are no subscribers for this movie</div>
                 :
                 <ul>
                 {
                     movieSubscribers.map(ms => {
                         return <li className='listElement' key={ms.id}><Link to={`/subscriptions/${ms.id}`}>{members.filter(m => m._id === ms.id)[0].name}</Link>, {moment(ms.dateWatched).format('YYYY')}</li>
                     })
                 }
                 </ul>
            }

            {
                hasPermissionToUpdate ?
                    <Button color="primary" variant="outlined"><Link to={`/movie/${props.movie._id}`}>Edit</Link></Button>
                :
                <Button color="primary" variant="outlined" disabled><Link to={`/movie/${props.movie._id}`}>Edit</Link></Button>

            }
            
            <input type="button" value="Delete" disabled = {!hasPermissionToDelete} onClick={() => deleteMovie(props.movie._id)}/>


        </div>
    )
}

export default MovieComp
