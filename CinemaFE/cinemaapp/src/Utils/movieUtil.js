import axios from 'axios';

const moviesUrl = 'http://localhost:5000/api/movies/';
                   
const loadMovies = async() =>{
    let resp = await axios.get(moviesUrl);
    return resp.data;
}

const addMovie = async (newMovie) =>{
    let resp = {};
    try{
        let token = sessionStorage.getItem("id");
        resp = await axios.post(moviesUrl, newMovie, {headers: {"Authorization" : `Bearer ${token}`}});
        
    }
    catch(err){
        console.log(`An Error occured while try to add new movie: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured while try to add new movie'
        }

        console.log(resp.data)
    }

    return resp.data;
}

const updateMovie = async (updatedMovie) =>{
    let resp = {};
    
    try{
        resp = await axios.put(moviesUrl, updatedMovie);
    }
    catch(err){
        console.log(`An Error occured while try to update movie: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured while try to update movie'
        }

        //console.log(resp.data)
    }

    return resp.data;
}

const deleteMovie = async (id) =>{
    let resp = await axios.delete(`${moviesUrl}${id}`);
    return resp.data;
}

export default { loadMovies, addMovie, updateMovie, deleteMovie };