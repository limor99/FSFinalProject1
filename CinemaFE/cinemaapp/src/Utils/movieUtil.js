import axios from 'axios';
import globalUtil from './globalUtil';

const moviesUrl = 'http://localhost:5000/api/movies/';

                   
const loadMovies = async() =>{
    let resp = await axios.get(moviesUrl);
    return resp.data;
}

const addMovie = async (newMovie) =>{
    let resp = {};
    try{
        const header = globalUtil.getHeader();
        
        //header structure:  {headers: {"Authorization" : `Bearer ${token}`}});
        resp = await axios.post(moviesUrl, newMovie, header);
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
        const header = globalUtil.getHeader();
        //resp = await axios.put(moviesUrl, updatedMovie);
        resp = await axios.put(moviesUrl, updatedMovie, header);
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
    let resp = {};
    
    try{
        const header = globalUtil.getHeader();
        //resp = await axios.delete(`${moviesUrl}${id}`);
        resp = await axios.delete(`${moviesUrl}${id}`, header);
    }
    catch(err){
        console.log(`An Error occured while try to delete movie: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured while try to delete movie'
        }
    }

    return resp.data;
}

export default { loadMovies, addMovie, updateMovie, deleteMovie };