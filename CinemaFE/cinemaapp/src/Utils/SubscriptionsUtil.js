import axios from 'axios';
import membersUtils from './membersUtil';
import moviesUtils from './movieUtil';

const subscriptionsUrl = "http://localhost:5000/api/subscriptions/";

const getSubscriptions = async () =>{
    let resp = await axios.get(`${subscriptionsUrl}`);
    return resp.data;

}
/*
const getFullMembersSubscriptions = async () => {
    let subscriptionsMovies = null; //the members's subscriptions movies (each member and his subscribed & unsubscribed movies)
    let membersResp = await membersUtils.loadMembers();
    let moviesResp = await moviesUtils.loadMovies();
    let subscriptionsResp = await getSubscriptions();
    let members, movies, subscriptions;

    if(membersResp){
        members = membersResp.members;
    }

    if(moviesResp){
        movies = moviesResp.movies;
    }

    if(subscriptionsResp){
        subscriptions = subscriptionsResp.subscriptions;
    }
    

    if(subscriptions && members && movies)
    {
        subscriptionsMovies = members.map(member =>{
            let memberSubscribesMovies;  //all movies the member watched already (the movie's id and watched date)
            let memberMovies;   //all movies the member watched already (include the movie's data)
            let subscribeMoviesIds = [];    //all the subscribes's movies id (per member)
            let unsubscribedMovies = [];    //unwatched movies for member
            let subscription = subscriptions.filter(s => s.memberId === member._id);
            if(subscription.length > 0){
                memberSubscribesMovies = subscription[0].movies;
                let movie;

                if(memberSubscribesMovies != undefined){
                    memberMovies = memberSubscribesMovies.map(mi =>{
                        subscribeMoviesIds.push(mi.movieId)
                        movie = movies.filter(m => mi.movieId === m._id);
                        if(movie.length > 0){
                            return {
                                "id" : movie[0]._id,
                                "name" : movie[0].name,
                                'genres': movie[0].genres,
                                'imgUrl': movie[0].image.medium,
                                'premiered': movie[0].image.premiered,
                                "watchedDate" : mi.date
                            }

                        }
                        
                    })
                    
                    movies.forEach(m => {
                        if(!subscribeMoviesIds.includes(m._id)){
                            let unsubscribedMovie = {
                                "id" : m._id,
                                "name" : m.name
                            }
                            
                           unsubscribedMovies = [...unsubscribedMovies, unsubscribedMovie];
                        }
                    });
                }
            }
            else{
                unsubscribedMovies = movies;
            }

            return {
                "id" : member._id,
                "name" : member.name,
                "email" : member.email,
                "city" : member.city,
                "movies" : memberMovies !== undefined ? memberMovies : [],
                "unwatched" : unsubscribedMovies
            }
        })
    }

    return subscriptionsMovies;

}
*/

const getMembersSubscriptions = async () => {
    let subscriptionsMovies = null; //the members's subscriptions movies (each member and his subscribed & unsubscribed movies)
    let membersResp = await membersUtils.loadMembers();
    let moviesResp = await moviesUtils.loadMovies();
    let subscriptionsResp = await getSubscriptions();
    let members, movies, subscriptions;

    if(membersResp){
        members = membersResp.members;
    }

    if(moviesResp){
        movies = moviesResp.movies;
    }

    if(subscriptionsResp){
        subscriptions = subscriptionsResp.subscriptions;
    }
    

    if(subscriptions && members && movies)
    {
        subscriptionsMovies = members.map(member =>{
            let memberSubscribesMovies;  //all movies the member watched already (the movie's id and watched date)
            let memberMovies;   //all movies the member watched already (include the movie's data)
            let subscribeMoviesIds = [];    //all the subscribes's movies id (per member)
            let unsubscribedMovies = [];    //unwatched movies for member
            let subscription = subscriptions.filter(s => s.memberId === member._id);
            if(subscription.length > 0){
                memberSubscribesMovies = subscription[0].movies;
                let movie;

                if(memberSubscribesMovies != undefined){
                    memberMovies = memberSubscribesMovies.map(mi =>{
                        subscribeMoviesIds.push(mi.movieId)
                        movie = movies.filter(m => mi.movieId === m._id);
                        if(movie.length > 0){
                            return {
                                "id" : movie[0]._id,
                                "watchedDate" : mi.date
                            }
                        }
                        
                    })

                    movies.forEach(m => {
                        if(!subscribeMoviesIds.includes(m._id)){
                            unsubscribedMovies.push({'id': m._id});
                        }
                    });
                }
            }
            else{
                unsubscribedMovies = movies.map(m =>{
                    return {
                        'id': m._id
                    }
                })
            }

            return {
                "id" : member._id,
                "name" : member.name,
                "email" : member.email,
                "city" : member.city,
                "movies" : memberMovies !== undefined ? memberMovies : [],
                "unwatched" : unsubscribedMovies
            }
        })
    }

    return subscriptionsMovies;

}

/*
const getFullMoviesSubscriptions = async () => {
    let moviesSubscribers = null; //the movies's subscriptions (each movie and it's subscribers)
    let membersResp = await membersUtils.loadMembers();
    let moviesResp = await moviesUtils.loadMovies();
    let subscriptionsResp = await getSubscriptions();
    let members, movies, subscriptions;

    if(moviesResp){
        movies = moviesResp.movies;
    }
    
    if(membersResp){
        members = membersResp.members;
    }

    if(subscriptionsResp){
        subscriptions = subscriptionsResp.subscriptions;
    }

    if(subscriptions && movies && members)
    {
        moviesSubscribers = movies.map(movie => {
            let subscriberToMovie = [];
            subscriptions.forEach(s =>{
                let subscribedMovies = s.movies;
                let subscribedMovie = subscribedMovies.filter(sm => sm.movieId === movie._id);
                if(subscribedMovie.length > 0){
                    let memberName;
                    let memberId = s.memberId;
                    let member = members.filter(mem => mem._id === memberId);
                    if(member.length > 0){
                        memberName = member[0].name;

                        let subscribe = {
                            memberId : memberId,
                            memberName : memberName,
                            dateWatched : subscribedMovie[0].date
                        }

                        subscriberToMovie.push(subscribe);
                    }
                }
            })
            return{
                id : movie._id,
                name : movie.name,
                premiered : movie.premiered,
                genres : movie.genres,
                image : movie.image.medium,
                subscriberToMovie
    
            }
        });
    }
        
    return moviesSubscribers;

}
*/

const getMoviesSubscriptions = async () => {
    let moviesSubscribers = null; //the movies's subscriptions (each movie and it's subscribers)
    let membersResp = await membersUtils.loadMembers();
    let moviesResp = await moviesUtils.loadMovies();
    let subscriptionsResp = await getSubscriptions();
    let members, movies, subscriptions;

    if(moviesResp){
        movies = moviesResp.movies;
    }
    
    if(membersResp){
        members = membersResp.members;
    }

    if(subscriptionsResp){
        subscriptions = subscriptionsResp.subscriptions;
    }

    if(subscriptions && movies && members)
    {
        moviesSubscribers = movies.map(movie => {
            let subscribersToMovie = [];
            subscriptions.forEach(s =>{
                let subscribedMovies = s.movies;
                let subscribedMovie = subscribedMovies.filter(sm => sm.movieId === movie._id);
                if(subscribedMovie.length > 0){
                    let memberId = s.memberId;
                    let member = members.filter(mem => mem._id === memberId);
                    if(member.length > 0){
                        let subscribe = {
                            id : memberId,
                            dateWatched : subscribedMovie[0].date
                        }

                        subscribersToMovie.push(subscribe);
                    }
                }
            })
            return{
                id : movie._id,
                subscribersToMovie
    
            }
        });
    }
        
    return moviesSubscribers;

}

const subscribeToMovie = async (subscribedMovie) =>{
    let resp = await axios.post(subscriptionsUrl, subscribedMovie);
    return resp.data;

}

export default {getSubscriptions, getMembersSubscriptions, getMoviesSubscriptions, subscribeToMovie};