import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './MemberComp.css';
import membersUtil from '../../Utils/membersUtil';

import moment from 'moment';
 

function MemberSubscriptionComp(props) {
    const [watchedMovies, setWatchedMovies] = useState(props.memberSubscriptions.movies);

    const dispatch = useDispatch();
    const history = useHistory();

    const deleteMember = async (memberId) =>{
        let response = await membersUtil.deleteMember(memberId);
        if(response.success){
            dispatch({
                type: "DeleteMember",
                payload: memberId
            })
        }
        
        dispatch({
        
            type: "UpdateMsg",
            payload: response.msg
        })

        history.push('/subscriptions');
    }

    const subscribeToMovie = () =>{

    }

    return (
        <div className='moviesWatched'>

<h4>{props.memberSubscriptions.name}</h4>
           Email: {props.memberSubscriptions.email} <br/>
           City: {props.memberSubscriptions.city} <br/>
            {console.log(props.memberSubscriptions.name)}
           <button><Link to={`/subscription/${props.memberSubscriptions.id}`}>Edit</Link></button>
           <input type="button" value="Delete" onClick={() => deleteMember(props.memberSubscriptions.id)}/>
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

export default MemberSubscriptionComp
