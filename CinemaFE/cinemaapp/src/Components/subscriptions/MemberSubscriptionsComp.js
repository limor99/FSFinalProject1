import React, {useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './MemberComp.css'

import moment from 'moment';
 

function SubscriptionComp(props) {
    const [watchedMovies, setWatchedMovies] = useState(props.memberSubscriptions.movies);
    console.log('watchedMovies', {watchedMovies});
    const deleteMember = (memberId) =>{


    }

    
    const subscribeToMovie = () =>{

    }

    return (
        <div className='moviesWatched'>

<h4>{props.memberSubscriptions.name}</h4>
           Email: {props.memberSubscriptions.email} <br/>
           City: {props.memberSubscriptions.city} <br/>

           <button><Link to={`/subscription/${props.memberSubscriptions.id}`}>Edit</Link></button>
           <input type="button" value="Delete" onClick={() => deleteMember(props.member._id)}/>
            <h5>Movies Watched</h5>
            
            {
                
                watchedMovies.length === 0 ? <div>this member didn't watch any movie yet</div> : 
                <ul>
                    {
                        watchedMovies.map(wm =>{
                            return <li key={wm.movieId} className='stam'><Link to={`/movie/${wm.movieId}`}>{wm.movieName}</Link>, {moment(wm.watchDate).format('DD/MM/YYYY')}</li>

                        })
                    }
                </ul>
            }
                                    
            
           
        </div>
    )
}

export default SubscriptionComp
