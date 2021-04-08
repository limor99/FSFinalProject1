import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './MovieComp.css';
import moviesUtil from '../../Utils/movieUtil';


function MovieComp(props) {
    const dispatch = useDispatch();

    const deleteMovie = async (movieId) =>{
       /* let response = await moviesUtil.deleteMovie(movieId);
        if(response.success){
            dispatch({
                type: "DeleteMovie",
                payload: movieId
            })
        }
        else{
            dispatch({
                type: "UpdateMsg",
                payload: response.msg
            })
        }*/
    }

    return (
        <div className="movie">
            name: {props.movie.name} <br/>
            year: {props.movie.premiered.slice(0, 4)} <br/>
            genres: {props.movie.genres.join()} <br/>
            image: <img className="imgSize" src={props.movie.image.medium}/> <br/>
            subscriptions: <br/>

            <button><Link to={`/movie/${props.movie._id}`}>Edit</Link></button>
            <input type="button" value="Delete" onClick={() => deleteMovie(props.movie._id)}/>


        </div>
    )
}

export default MovieComp
