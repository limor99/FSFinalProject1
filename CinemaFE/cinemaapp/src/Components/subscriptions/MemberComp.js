import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SubscribeToMovie from './SubscribeToMovieComp';

import membersUtil from '../../Utils/membersUtil';

import moment from 'moment';


import './MemberComp.css'

function MemberComp(props) {
    const [isShowUnsubscribeMovies, setIsShowUnsubscribeMovis] = useState(false);

    const movies = useSelector(state => state.movies)
    const moviesSubscribed = useSelector(state => state.membersSubscriptions.filter(ms => ms.id === props.member._id)[0].movies);

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
    }

    return (
        <div className="member">
           <h4>{props.member.name}</h4>
           Email: {props.member.email} <br/>
           City: {props.member.city} <br/>

           <button><Link to={`/subscription/${props.member._id}`}>Edit</Link></button>
           <input type="button" value="Delete" onClick={() => deleteMember(props.member._id)}/>

           <h5>Movies Watched</h5>
            <button onClick={() => subscribeToMovie()} >subscribe To New Movie</button>

            {isShowUnsubscribeMovies ? <SubscribeToMovie memberId={props.member._id} /> : null}
            {
                moviesSubscribed.length === 0 ? <div>this member didn't watch any movie yet</div> : 
                <ul>
                    {
                        moviesSubscribed.map(ms =>{
                            return <li key={ms.id} className='listElement'><Link to={`/movies/${ms.id}`}>{movies.filter(m => m._id === ms.id)[0].name}</Link>, {moment(ms.watchedDate).format('DD/MM/YYYY')}</li>

                        })
                    }
                </ul>
            }

            
        </div>
    )
}

export default MemberComp;
