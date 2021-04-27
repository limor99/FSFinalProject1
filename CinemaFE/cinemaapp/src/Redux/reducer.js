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
            let currentUsersCopy = [...state.users] ;
            let userToUpdateIndx = state.users.findIndex(user => user.id === action.payload.id)
            if(userToUpdateIndx > -1){
                let updatedUser = action.payload;
                currentUsersCopy[userToUpdateIndx] = updatedUser;
            }

            return {...state, users : currentUsersCopy};

        case 'AddMovie':
            let newMovie = action.payload;
            newMoviesArr = [...currentMovies, newMovie];

            return {...state, movies : newMoviesArr};

        case 'UpdateMovie':
            let currentMoviesCopy = [...state.movies] ;
            let movieToUpdateIndx = currentMoviesCopy.findIndex(movie => movie._id === action.payload._id)
            if(movieToUpdateIndx > -1){
                let updatedMovie = action.payload;
                currentMoviesCopy[movieToUpdateIndx] = updatedMovie;
            }

            return {...state, movies : currentMoviesCopy};

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
                'unwatched' : state.movies
            }
            newMembersSubscriptionsArr = [...currentMembersSubscriptions, newMemberSubscription];
            return {...state, membersSubscriptions : newMembersSubscriptionsArr};

        case 'UpdateMember':
            let currentMembersSubscriptionsCopy = [...state.membersSubscriptions];
            let memberToUpdateIndx = currentMembersSubscriptions.findIndex(cms => cms.id === action.payload.id);
            if(memberToUpdateIndx > -1){
                let updatedMember = action.payload;
                let currenMember = currentMembersSubscriptionsCopy[memberToUpdateIndx];
                let memberToUpdate = {...currenMember, name: updatedMember.name, email: updatedMember.email, city: updatedMember.city};
                currentMembersSubscriptionsCopy[memberToUpdateIndx] = memberToUpdate;
            }

            return {...state, membersSubscriptions : currentMembersSubscriptionsCopy};

        case 'DeleteMember':
                let memberId = action.payload;
                let currentMembersSubscriptionsCopy3 = [...state.membersSubscriptions];
                let memberToDeleteIndx = currentMembersSubscriptionsCopy3.findIndex(cms => cms.id === memberId)
                if(memberToDeleteIndx > -1){
                    currentMembersSubscriptionsCopy3.splice(memberToDeleteIndx, 1);
                }
                
                return {...state, membersSubscriptions : currentMembersSubscriptionsCopy3};

        case 'SubscribeToMovie':
            let currentMembersSubscriptionsCopy2 = [...state.membersSubscriptions];
            let memberSubscribedMovie = action.payload;
            let subscribedMemberIndx = currentMembersSubscriptionsCopy2.findIndex(cmsc => cmsc.id === memberSubscribedMovie.memberId);
            if(subscribedMemberIndx > -1){
                let subscribedMember = currentMembersSubscriptionsCopy2[subscribedMemberIndx];
                let watchedMovies = [...subscribedMember.movies];
                let unwatchedMovies = [...subscribedMember.unwatched];
                let subscribedMovieIndx = unwatchedMovies.findIndex(uwm => uwm._id === memberSubscribedMovie.selectedMovieId);
                if(subscribedMovieIndx > -1){
                    let subscribedMovie = unwatchedMovies.splice(subscribedMovieIndx, 1);
                    subscribedMovie[0].watchedDate = memberSubscribedMovie.watchedDate;
                    watchedMovies.push(subscribedMovie[0]);
                    subscribedMember.movies = watchedMovies;
                    subscribedMember.unwatched = unwatchedMovies;
                    currentMembersSubscriptionsCopy2[subscribedMemberIndx] = subscribedMember;
                }
            }           

            return {...state, membersSubscriptions : currentMembersSubscriptionsCopy2};
        
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