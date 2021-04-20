import { act } from '@testing-library/react';
import movieUtil from '../../src/Utils/movieUtil';

function reducer(state = { users : [], movies : [], members : [], subscriptions : [], membersSubscriptions: [], counter: 0, userFullName: '', msg: ''}, action){
    let currentUsers = state.users;
    let newUsersArr = null;
    
    let currentMovies = state.movies;
    let newMoviesArr = null;
    
    let currentMembers = state.members;
    let newMembersArr = null;

    let currentMembersSubscriptions = state.membersSubscriptions;
    let newMembersSubscriptionsArr = null;

    let currentSubscriptions = state.subscriptions;
    let newSubscriptionsArr = null;

    switch (action.type){
        case 'LoadData':
         //   let movies = action.payload;
           // let movies3 = movies.slice(0, 2);
          // console.log(' mpvies in payload')

           // console.table(movies);

         //       let currentMovies = state.movies;
           //     currentMovies = currentMovies.concat(movies)
            //    console.log('all movies after we load')
             //   console.log(currentMovies)

                return { ...state, movies: currentMovies};
        case 'LoadUsers':
            let users = action.payload;
            newUsersArr = [...currentUsers, ...users];

            return {...state, users : newUsersArr};

        case 'LoadMovies':
            let movies = action.payload;
            newMoviesArr = [...currentMovies, ...movies];

            return {...state, movies : newMoviesArr};

        case 'LoadMembers':
            let members = action.payload;
            newMembersArr = [...currentMembers, ...members];

            return {...state, members : newMembersArr};
        
        case 'LoadMembersSubscriptions':
            let membersSubscriptions = action.payload;
            newMembersSubscriptionsArr = [...currentMembersSubscriptions, ...membersSubscriptions];

            return {...state, membersSubscriptions : newMembersSubscriptionsArr};

        
        case 'LoadSubscriptions':
            let subscriptions = action.payload;
            newSubscriptionsArr = [...currentSubscriptions, ...subscriptions];

            return {...state, subscriptions : newSubscriptionsArr};
            
        case 'AddUser':
            let newUser = action.payload;
            newUsersArr = [...currentUsers, newUser];

            return {...state, users : newUsersArr};
            
        case 'DeleteUser':
            let userId = action.payload;
            let updatedUsers = currentUsers.filter(u => u.id !== userId);

            return {...state, users : updatedUsers};

        case 'UpdateUser':
            let userToUpdateIndx = state.users.findIndex(user => user.id === action.payload.id)
            if(userToUpdateIndx > -1){
                currentUsers = state.users;
                let updatedUser = action.payload;
                currentUsers[userToUpdateIndx] = updatedUser;
            }

            return {...state, users : currentUsers};

        case 'AddMovie':
            let newMovie = action.payload;
            newMoviesArr = [...currentMovies, newMovie];

            return {...state, movies : newMoviesArr};

        case 'UpdateMovie':
            let updatedMovie = action.payload;
            let movieToUpdateIndx = currentMovies.findIndex(movie => movie._id === updatedMovie._id)
            if(movieToUpdateIndx > -1){
                currentMovies[movieToUpdateIndx] = updatedMovie;
            }
            
            return {...state, movies : currentMovies};

        case 'DeleteMovie':
            let movieId = action.payload;
            let updatedMovies = currentMovies.filter(m => m._id !== movieId);
    
            return {...state, movies : updatedMovies};

        case 'AddMember':
            let newMember = action.payload;
            let newMemberSubscription = {
                'id' : newMember._id,
                'name' : newMember.name,
                'email' : newMember.email,
                'city' : newMember.city,
                'movies' : [],
                'unwatched' : []
            }
            newMembersSubscriptionsArr = [...currentMembersSubscriptions, newMemberSubscription];
            return {...state, membersSubscriptions : newMembersSubscriptionsArr};

        case 'UpdateMember':
            let updatedMember = action.payload;
            let memberToUpdateIndx = currentMembersSubscriptions.findIndex(cms => cms.id === updatedMember.id)
            if(memberToUpdateIndx > -1){
                currentMembersSubscriptions[memberToUpdateIndx].name = updatedMember.name;
                currentMembersSubscriptions[memberToUpdateIndx].email = updatedMember.email;
                currentMembersSubscriptions[memberToUpdateIndx].city = updatedMember.city;
            }
            
            return {...state, membersSubscriptions : currentMembersSubscriptions};

            case 'DeleteMember':
                let memberId = action.payload;
                let memberToDeleteIndx = currentMembersSubscriptions.findIndex(cms => cms.id === memberId)
                if(memberToDeleteIndx > -1){
                    currentMembersSubscriptions.splice(memberToDeleteIndx, 1);
                }
                
                return {...state, membersSubscriptions : currentMembersSubscriptions};
        
        case 'UpdateMsg':
            let newMsg = action.payload;
             return {...state, msg: newMsg}

        case 'updateUserFullName':
            let userFullName = action.payload;

            return { ...state, userFullName: userFullName};
        default: 
            return state;
    }
}

export default reducer;