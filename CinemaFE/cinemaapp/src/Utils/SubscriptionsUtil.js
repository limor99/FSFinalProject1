import axios from 'axios';
import membersUtils from './membersUtil';
import moviesUtils from './movieUtil';

const subscriptionsUrl = "http://localhost:5000/api/subscriptions/";

const getSubscriptions = async () =>{
    let resp = await axios.get(`${subscriptionsUrl}`);
    return resp.data;

}

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
                                "movieId" : movie[0]._id,
                                "movieName" : movie[0].name,
                                'movieGenres': movie[0].genres,
                                'movieImgUrl': movie[0].image.medium,
                                'moviePremiered': movie[0].image.premiered,
                                "watchDate" : mi.date
                            }

                        }
                        
                    })
                    
                    movies.forEach(m => {
                        if(!subscribeMoviesIds.includes(m._id)){
                            let unsubscribedMovie = {
                                "_id" : m._id,
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

const subscribeToMovie = async (subscribedMovie) =>{
    let resp = await axios.post(subscriptionsUrl, subscribedMovie);
    return resp.data;

}

export default {getSubscriptions, getFullMembersSubscriptions, subscribeToMovie};