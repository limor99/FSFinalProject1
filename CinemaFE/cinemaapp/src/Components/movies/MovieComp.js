import React from 'react';
import { Link } from 'react-router-dom';
import './MovieComp.css';

const deleteMovie = (movieId) =>{

}


function MovieComp(props) {
    return (
        <div className="movie">
            name: {props.movie.name} <br/>
            year: {props.movie.premiered.slice(0, 4)} <br/>
            image: <img className="imgSize" src={props.movie.image.medium}/> <br/>
            subscriptions: <br/>

            <button><Link to={`/movie/${props.movie._id}`}>Edit</Link></button>
            <input type="button" value="Delete" onClick={() => deleteMovie(props.user.id)}/>


        </div>
    )
}

export default MovieComp
