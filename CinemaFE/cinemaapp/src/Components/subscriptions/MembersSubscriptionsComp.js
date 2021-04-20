import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MemberSubscriptions from './MemberSubscriptionsComp';
import MemberMenu from './menu/MemberMenu';

import './MembersSubscriptionsComp.css';
import subscriptionsUtil from '../../Utils/subscriptionsUtil';

function MembersSubscriptionsComp() {
    const membersSubscriptions = useSelector(state => state.membersSubscriptions);
    const msg = useSelector(state => state.msg)
    const dispatch = useDispatch();

    return (
        <div className=''>
            <MemberMenu/>
            {msg}
            <div className='subscribers'>
                All Members Subscriptions

                {
                    membersSubscriptions.map(ms =>{
                        return <MemberSubscriptions key={ms.id} memberSubscriptions={ms} />

                    })
                }
            </div>
        </div>

        
    )
}

export default MembersSubscriptionsComp
