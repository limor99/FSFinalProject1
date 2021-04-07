import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function MovieMenu() {
    const history = useHistory();


    return (
        <div>
            <ul>
                <li>{history.location.pathname === '/movies' ? 'All Movies' : <Link to='/movies'>All Movies</Link>} </li>&nbsp;&nbsp;
                <li>{history.location.pathname === '/addMovie' ? 'Add Movie' : <Link to='/addMovie'>Add Movie</Link>} </li>&nbsp;&nbsp;
            </ul>
            
        </div>
    )
}

export default MovieMenu
