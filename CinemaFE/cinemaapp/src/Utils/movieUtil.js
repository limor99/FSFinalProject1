import axios from 'axios';

const moviesUrl = 'http://localhost:5000/api/movies/';
                   
const loadMovies = async() =>{
    let resp = await axios.get(moviesUrl);
    return resp.data;
}

export default { loadMovies };