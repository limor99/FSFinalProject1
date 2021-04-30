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
            name: {props.movieSubscribers.name} <br/>
            year: {props.movieSubscribers.premiered.slice(0, 4)} <br/>
            genres: {props.movieSubscribers.genres.join()} <br/>
            image: <img className="imgSize" src={props.movieSubscribers.image}/> <br/>
            {
                props.movieSubscribers.subscriberToMovie.length === 0 ? 
                    <div>There are no subscribers for this movie</div>
                    :
                    <ul>
                    {
                        props.movieSubscribers.subscriberToMovie.map(stm => {
                            console.log({stm})
                            return <li key={stm.memberId}>{stm.memberName}</li>
                        })
                    }
                    </ul>
            }

            <button><Link to={`/movie/${props.movieSubscribers.id}`}>Edit</Link></button>
            <input type="button" value="Delete" onClick={() => deleteMovie(props.movieSubscribers.id)}/>


        </div>
    )
}

export default MovieComp
