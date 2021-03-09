import { act } from '@testing-library/react';
import movieUtil from '../../src/Utils/movieUtil';

function reducer(state = { users : [], movies : [{name : "aaa"}], counter: 0, userFullName: '', msg: ''}, action){
    let currentUsers = state.users;
    let newUsersArr = null;

    switch (action.type){
        case "LoadData":
            let movies = action.payload;
           // let movies3 = movies.slice(0, 2);
          // console.log(" mpvies in payload")

           // console.table(movies);

                let currentMovies = state.movies;
                currentMovies = currentMovies.concat(movies)
            //    console.log("all movies after we load")
             //   console.log(currentMovies)

                return { ...state, movies: currentMovies};
        case "LoadUsers":
            let users = action.payload;
            newUsersArr = [...currentUsers, ...users];

            return {...state, users : newUsersArr};
        
        case "AddUser":
            let newUser = action.payload;
            newUsersArr = [...currentUsers, newUser];

            return {...state, users : newUsersArr};
            
        case "DeleteUser":
            let userId = action.payload;
            let updatedUsers = currentUsers.filter(u => u.id !== userId);

            return {...state, users : updatedUsers};

        case "UpdateMsg":
            let newMsg = action.payload;
             return {...state, msg: newMsg}

        case "updateUserFullName":
            let userFullName = action.payload;

            return { ...state, userFullName: userFullName};
        default: 
            return state;
    }
}

export default reducer;