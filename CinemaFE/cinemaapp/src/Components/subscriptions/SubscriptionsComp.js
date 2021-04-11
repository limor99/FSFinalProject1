import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SubscriptionsComp.css';
import subscriptionsUtil from '../../Utils/SubscriptionsUtil';

function SubscriptionsComp() {
    const subscriptions = useSelector(state => state.subscriptions);
    const dispatch = useDispatch();
    

    
    
    useEffect(() => {
        (async function loadData() {
            if(subscriptions.length === 0){

                let respSubscriptions = await subscriptionsUtil.getSubscriptions();
                
                dispatch({
                    type: 'LoadSubscriptions',
                    payload: respSubscriptions
                });

            }
        })()
    }, [])

    const subscribeToMovie = () =>{

    }

    return (
        <div className='subscribers'>
            <h6>Movie Watched</h6>
           <input type='button' value='Subscribe To New Movie' onClick={() => subscribeToMovie()}/>
        </div>
    )
}

export default SubscriptionsComp
