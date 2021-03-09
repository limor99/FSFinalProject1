const express = require('express');
const router = express.Router();

const moviesBL = require('../models/movies/moviesBL');

router.route('/').get(async function(req, res){
    let data  = await moviesBL.getMovies();
    res.send(data);
})

router.route('/:id').get(async function(req, res){
    let id = req.params.id;
    let data = await moviesBL.getMovieById(id);
    res.send(data);
})

router.route('/:id').put(async function(req, res){
    let id = req.params.id;
    let updateMovie = req.body.movie;

    let data = await moviesBL.updateMovie(id, updateMovie);

    res.send(data);
})

router.route('/').post(async function(req, res){
    let addedMovie = req.body.movie;

    let data = await moviesBL.addMovie(addedMovie);

    res.send(data);
})



module.exports = router;

