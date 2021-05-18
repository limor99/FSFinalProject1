import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import SubscribeToMovie from './SubscribeToMovieComp';

import membersUtil from '../../Utils/membersUtil';

import moment from 'moment';


import './MemberComp.css'

function MemberComp(props) {
    const [isShowUnsubscribeMovies, setIsShowUnsubscribeMovis] = useState(false);

    const movies = useSelector(state => state.movies)
    const moviesSubscribed = useSelector(state => state.membersSubscriptions.filter(ms => ms.id === props.member._id)[0].movies);

    const [hasPermissionToDelete, setHasPermissionToDelete] = useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('Delete Subscriptions')))
    const [hasPermissionToUpdate, setHasPermissionToUpdate] = useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('Update Subscriptions')))

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

           {
               hasPermissionToUpdate ?
                    <Button color="primary" variant="outlined"><Link to={`/subscription/${props.member._id}`}>Edit</Link></Button>
               :
               <Button color="primary" variant="outlined" disabled><Link to={`/subscription/${props.member._id}`}>Edit</Link></Button>
           }

           <input type="button" value="Delete" disabled = {!hasPermissionToDelete} onClick={() => deleteMember(props.member._id)}/>

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
