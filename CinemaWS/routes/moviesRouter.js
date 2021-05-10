const express = require('express');
const router = express.Router();

const moviesBL = require('../models/movies/moviesBL');

const checkAuth = require('../middlelwares/checkAuth');

router.route('/').get(checkAuth('View Movies'), async function(req, res){
    let data  = await moviesBL.getMovies();
    res.send(data);
})

router.route('/:id').get(checkAuth('View Movies'), async function(req, res){
    let id = req.params.id;
    let data = await moviesBL.getMovieById(id);
    res.send(data);
})

router.route('/').put(checkAuth('Update Movies'), async function(req, res){
    let updatedMovie = req.body;

    let data = await moviesBL.updateMovie(updatedMovie);

    res.send(data);
})

router.route('/').post(checkAuth('Create Movies'), async function(req, res){
    let addedMovie = req.body;

    let data = await moviesBL.addMovie(addedMovie);

    res.send(data);
})

router.route('/:id').delete(checkAuth('Delete Movies'), async function(req, res){
    let id = req.params.id;

    let isDeleted = await moviesBL.deleteMovie(id);

    if(isDeleted){
        let response = {
            success : true,
            msg : `User ${id} deleted` 
        }
        res.status(200).json(response);
    }
    else{
        let response = {
            success : false,
            msg : `An error ocuured while try to delete user: ${id}` 
        }
        res.json(response);

    }
})



module.exports = router;

