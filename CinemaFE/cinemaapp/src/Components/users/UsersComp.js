import React from 'react';
import { useSelector } from 'react-redux';

import UserMenu from './menu/UserMenu';
import User from './UserComp';

function UsersComp() {
    const users = useSelector(state => state.users);
    const msg = useSelector(state => state.msg);

    return (
        <div>
            {console.log(users.legnth)}
            <UserMenu/>
            <h1>All Users</h1>
            
            {msg}
            
            {
                users.map((user, index) =>{
                    return <User key={index} user={user}/>
                })
            }

        

        </div>
    )
}

export default UsersComp;
