import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Member from './MemberComp';
import MemberMenu from './menu/MemberMenu';

function MembersComp(props) {
    const members = useSelector(state => state.members);
    const [displayMembers, setDispalyMembers] = useState(members)
    const msg = useSelector(state => state.msg)
    const [hasPermission, setHasPermission] =useState((sessionStorage.getItem("permissions") !== null && sessionStorage.getItem("permissions").includes('View Subscriptions')))
    
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
        <div className='members services'>
            <MemberMenu/>
            <h1>All Members Subscriptions</h1>
            {msg}
            {
                !hasPermission ? 
                <div>You have no permission to view members</div>
                :
                <div className='subscribers'>
                    
    
                    {
                        displayMembers.map(m =>{
                            return <Member key={m._id} member={m} />
    
                        })
                    }
                </div>
            }
            
        </div>

        
    )
}

export default MembersComp
