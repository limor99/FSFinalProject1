const axios = require('axios');
const moviesWSUrl = ('http://localhost:8000/api/movies/');

exports.getMovies = function(){
    return axios.get(moviesWSUrl);

}

exports.getMovieById = function(id){
    return axios.get(`${moviesWSUrl}${id}`);
}

exports.updateMovie = function(movieId ,movie){
    return axios.put(`${moviesWSUrl}${movieId}`, movie);
}

exports.addMovie = function(movie){
    return axios.post(`${moviesWSUrl}`, movie);
    
}