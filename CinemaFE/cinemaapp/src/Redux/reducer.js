function reducer(state = { users : [], movies : [], members : [], subscriptions : [], membersSubscriptions: [], moviesSubscribers: [], counter: 0, userFullName: '', msg: ''}, action){
    let currentUsers = state.users;
    let newUsersArr = null;
    
    let currentMovies = state.movies;
    let newMoviesArr = null;
    
    let currentMembers = state.members;
    let newMembersArr = null;

    let currentMembersSubscriptions = state.membersSubscriptions;
    let newMembersSubscriptionsArr = null;

    let currentmoviesSubscribers = state.moviesSubscribers;
    let newmoviesSubscribersArr = null;

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

        case 'LoadmoviesSubscribers':
            let moviesSubscribers = action.payload;
            newmoviesSubscribersArr = [...currentmoviesSubscribers, ...moviesSubscribers];

            return {...state, moviesSubscribers : newmoviesSubscribersArr};
        
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

            let newMovieSubscribers = {
                'id': newMovie._id,
                'subscribersToMovie': []
            }
            newMovieSubscribers = [...currentmoviesSubscribers, newMovieSubscribers];

            return {...state, movies : newMoviesArr, moviesSubscribers : newMovieSubscribers};

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
                'movies' : [],
                'unwatched' : state.movies.map(m => {
                    return {
                        'id': m._id,
                    }
                })
            
            }
            newMembersArr = [...currentMembers, newMember];
            newMembersSubscriptionsArr = [...currentMembersSubscriptions, newMemberSubscription];
            return {...state, members : newMembersArr, membersSubscriptions : newMembersSubscriptionsArr};

        case 'UpdateMember':
            let currentMembersCopy1 = [...state.members];
            let memberToUpdateIndx = currentMembersCopy1.findIndex(cmc => cmc._id === action.payload.id);
            if(memberToUpdateIndx > -1){
                let updatedMember = action.payload;
                let currenMember = currentMembersCopy1[memberToUpdateIndx];
                let memberToUpdate = {...currenMember, name: updatedMember.name, email: updatedMember.email, city: updatedMember.city};
                currentMembersCopy1[memberToUpdateIndx] = memberToUpdate;
            }

            return {...state, members : currentMembersCopy1};

        case 'DeleteMember':
                let memberId = action.payload;
                //let currentMembersSubscriptionsCopy3 = [...state.membersSubscriptions];
                let currentMembersCopy = [...state.members];
                //let memberToDeleteIndx = currentMembersSubscriptionsCopy3.findIndex(cms => cms.id === memberId)
                let memberToDeleteIndx = currentMembersCopy.findIndex(cmc => cmc._id === memberId)
                if(memberToDeleteIndx > -1){
                    currentMembersCopy.splice(memberToDeleteIndx, 1);
                }
                
                return {...state, members : currentMembersCopy};

        case 'SubscribeToMovie':
            let currentMembersSubscriptionsCopy2 = [...state.membersSubscriptions];
            let currentMoviesSubscribersCopy = [...state.moviesSubscribers];

            let memberSubscribedMovie = action.payload;

            let subscribedMemberIndx = currentMembersSubscriptionsCopy2.findIndex(cmsc => cmsc.id === memberSubscribedMovie.memberId);
            if(subscribedMemberIndx > -1){
                let subscribedMember = currentMembersSubscriptionsCopy2[subscribedMemberIndx];
                let watchedMovies = [...subscribedMember.movies];
                let unwatchedMovies = [...subscribedMember.unwatched];
                let subscribedMovieIndx = unwatchedMovies.findIndex(uwm => uwm.id === memberSubscribedMovie.selectedMovieId);
                if(subscribedMovieIndx > -1){
                    let subscribedMovie = unwatchedMovies.splice(subscribedMovieIndx, 1);
                    subscribedMovie[0].watchedDate = memberSubscribedMovie.watchedDate;
                    watchedMovies.push(subscribedMovie[0]);
                    subscribedMember.movies = watchedMovies;
                    subscribedMember.unwatched = unwatchedMovies;
                    currentMembersSubscriptionsCopy2[subscribedMemberIndx] = subscribedMember;
                }

                let movieSubscribersIndx = currentMoviesSubscribersCopy.findIndex(cms => cms.id === memberSubscribedMovie.selectedMovieId);
                if(movieSubscribersIndx > -1){
                    let allMovieSubscribersData = currentMoviesSubscribersCopy[movieSubscribersIndx];
                    let movieSubscribers = [...allMovieSubscribersData.subscribersToMovie];

                    let memberId = subscribedMember.id;
                    let wathcedDate = memberSubscribedMovie.watchedDate;
    
                    let newMovieSubscribe = {
                        'id': memberId,
                        dateWatched : wathcedDate
    
                    }

                    movieSubscribers.push(newMovieSubscribe);

                    allMovieSubscribersData.subscribersToMovie = movieSubscribers;
                    currentMoviesSubscribersCopy[movieSubscribersIndx] = allMovieSubscribersData;

                }
            }
            
            return {...state, membersSubscriptions : currentMembersSubscriptionsCopy2, moviesSubscribers : currentMoviesSubscribersCopy};
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
