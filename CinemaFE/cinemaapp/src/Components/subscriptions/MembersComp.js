import React from 'react';
import { useSelector } from 'react-redux';

import MemberMenu from '../subscriptions/menu/MemberMenu';
import Member from '../subscriptions/MemberComp';

function MembersComp() {
    const members = useSelector(state => state.members)

    return (
        <div>
            <MemberMenu/>
            All Subscriptions

            {
                members.map(member =>{
                    return <Member key={member._id} member={member} />

                })
            }
        </div>
    )
}

export default MembersComp
