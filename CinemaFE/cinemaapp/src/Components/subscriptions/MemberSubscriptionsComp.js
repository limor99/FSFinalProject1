import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import SubscribeToMovie from './SubscribeToMovieComp';

import './MemberComp.css';
import membersUtil from '../../Utils/membersUtil';

import moment from 'moment';
 

function MemberSubscriptionComp(props) {
    
  //  const [watchedMovies, setWatchedMovies] = useState(props.memberSubscriptions.movies);
    const [isShowUnsubscribeMovies, setIsShowUnsubscribeMovis] = useState(false);

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
        setIsShowUnsubscribeMovis(!isShowUnsubscribeMovies);
        //console.log(isShowUnsubscribeMovies);

    }

    return (
        <div className='moviesWatched'>

<h4>{props.memberSubscriptions.name}</h4>
           Email: {props.memberSubscriptions.email} <br/>
           City: {props.memberSubscriptions.city} <br/>
           <button><Link to={`/subscription/${props.memberSubscriptions.id}`}>Edit</Link></button>
           <input type="button" value="Delete" onClick={() => deleteMember(props.memberSubscriptions.id)}/>
            <h5>Movies Watched</h5>
            <button onClick={() => subscribeToMovie()} >subscribe To New Movie</button>
            
            {isShowUnsubscribeMovies ? <SubscribeToMovie memberId={props.memberSubscriptions.id} unwatched={props.memberSubscriptions.unwatched}/> : null}
                
            
            {
                
                props.memberSubscriptions.movies.length === 0 ? <div>this member didn't watch any movie yet</div> : 
                <ul>
                    {
                        props.memberSubscriptions.movies.map(wm =>{
                            return <li key={wm._id} className='stam'><Link to={`/movie/${wm._id}`}>{wm.name}</Link>, {moment(wm.watchedDate).format('DD/MM/YYYY')}</li>

                        })
                    }
                </ul>
            }
                                    
            
           
        </div>
    )
}

export default MemberSubscriptionComp
