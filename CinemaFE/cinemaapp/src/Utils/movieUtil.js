import axios from 'axios';

const moviesUrl = 'http://localhost:5000/api/movies/';
                   
const loadMovies = async() =>{
    let resp = await axios.get(moviesUrl);
    return resp.data;
}

const addMovie = async (newMovie) =>{
    let resp = {};
    try{
        resp = await axios.post(moviesUrl, newMovie);
        
    }
    catch(err){
        console.log(`An Error occured: ${err}`);
        resp.data = {
            succrss : false,
            msg : 'An Error occured'
        }

        console.log(resp.data)
    }

    return resp.data;
}

export default { loadMovies, addMovie };