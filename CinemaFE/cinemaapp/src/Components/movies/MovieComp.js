import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import './MovieComp.css';
import moviesUtil from '../../Utils/movieUtil';


function MovieComp(props) {
    const movieSubscribers = useSelector(state => state.moviesSubscribers.filter(stm => stm.id === props.movie._id)[0].subscribersToMovie);
    const members = useSelector(state => state.members)
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

            <button><Link to={`/movie/${props.movie._id}`}>Edit</Link></button>
            <input type="button" value="Delete" onClick={() => deleteMovie(props.movie._id)}/>


        </div>
    )
}

export default MovieComp
