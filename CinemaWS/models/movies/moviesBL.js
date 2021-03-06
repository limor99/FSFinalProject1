const moviesDAL = require('../../DAL/moviesREST');

exports.getMovies = async function(){
    let movies = null, response = null;

    try{
        response = await moviesDAL.getMovies();
        movies = response.data;
    }
    catch(err){
        console.log(`An error occured while try to get all movies: ${err}`);
    }

    return movies;
}

exports.getMovieById = async function(id){
    let movie = null, response = null;

    try{
        response = await moviesDAL.getMovieById(id);
        movie = response.data;
    }
    catch(err){
        console.log(`An error occured while try to get movie: ${id} : ${err}`);
    }

    return movie;
}

exports.updateMovie = async function(movie){
    let updateMovie = null, response = null;
    
    try{
        response = await moviesDAL.updateMovie(movie);
        updateMovie = response.data;
    }
    catch(err){
        console.log(`An error occured while try to update movie: ${movie._id} : ${err}`);
    }

    return updateMovie;

}

exports.deleteMovie = async function(id){
    let deleteMovie = null, response = null;
    
    try{
        response = await moviesDAL.deleteMovie(id);
        deleteMovie = response.data;
    }
    catch(err){
        console.log(`An error occured while try to delete movie: ${id} : ${err}`);
    }

    return deleteMovie;

}

exports.addMovie = async function(movie){
    let addedMovie = null,  response = null;

    try{
        response = await moviesDAL.addMovie(movie);
        
    }
    catch(err){
        console.log(`An error occured while try to add movie: ${movie.name} : ${err}`);
        response = {
            data: {
                success : false,
                msg: `An error occured while try to add movie: ${movie.name}`
            }
        }
    }
    addedMovie = response.data;
    return addedMovie;
}



/* TODO  -  write delete movie  including from the
subscription’s watched movies list */

