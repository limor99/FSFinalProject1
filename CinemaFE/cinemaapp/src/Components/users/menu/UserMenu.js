import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function UserMenu() {
    const history = useHistory();


    return (
        <div>
            <ul>
                <li>{history.location.pathname === '/users' ? 'All Users' : <Link to='/users'>All Users</Link>} </li>&nbsp;&nbsp;
                <li>{history.location.pathname === '/addUser' ? 'Add User' : <Link to='/addUser'>Add User</Link>} </li>&nbsp;&nbsp;
            </ul>
            
        </div>
    )
}

export default UserMenu
