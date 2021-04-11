import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function MemberMenu() {
    const history = useHistory();

    return (
        <div>
            <ul>
                <li>{history.location.pathname === '/subscriptions' ? 'All members' : <Link to='/subscriptions'>All Members</Link>} </li>&nbsp;&nbsp;
                <li>{history.location.pathname === '/addMember' ? 'Add Member' : <Link to='/addMember'>Add Member</Link>} </li>&nbsp;&nbsp;
            </ul>
            
        </div>
    )
}

export default MemberMenu
