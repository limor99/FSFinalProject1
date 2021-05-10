import React from 'react';
import { useSelector } from 'react-redux';

import MemberSubscriptions from './MemberSubscriptionsComp';
import MemberMenu from './menu/MemberMenu';

import './MembersSubscriptionsComp.css';

function MembersSubscriptionsComp() {
    const membersSubscriptions = useSelector(state => state.membersSubscriptions);
    const msg = useSelector(state => state.msg)
    
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
