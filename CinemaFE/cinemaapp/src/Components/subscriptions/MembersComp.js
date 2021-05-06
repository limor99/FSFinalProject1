import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Member from './MemberComp';
import MemberMenu from './menu/MemberMenu';

//import './MembersSubscriptionsComp.css';
import subscriptionsUtil from '../../Utils/subscriptionsUtil';

function MembersComp(props) {
    const members = useSelector(state => state.members);
    const [displayMembers, setDispalyMembers] = useState(members)
    const msg = useSelector(state => state.msg)
    const dispatch = useDispatch();

    useEffect(() => {
        let memberId = props.match.params.id;
        if(memberId !== undefined){
            let member = members.filter(m => m._id === memberId);
            if(member.length > 0)
            {
                setDispalyMembers(member)
            }
        }
    }, [])

    return (
        <div className=''>
            <MemberMenu/>
            {msg}
            <div className='subscribers'>
                All Members Subscriptions

                {
                    displayMembers.map(m =>{
                        return <Member key={m._id} member={m} />

                    })
                }
            </div>
        </div>

        
    )
}

export default MembersComp
