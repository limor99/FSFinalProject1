const express = require('express');
const router = express.Router();

const subscriptionsBL = require('../models/subscriptions/subscriptionsBL');

router.route('/').get(async function(req, res){
    let data  = await subscriptionsBL.getSubscriptions();
    res.send(data);
})

router.route('/').post(async function(req, res){
    let memberId = req.body.memberId;
    let subscribeMovieId = req.body.selectedMovieId;
    let watchedDate = req.body.watchedDate;

    let subscribeMovie = {
        memberId,
        subscribeMovieId,
        watchedDate
    }

    let data  = await subscriptionsBL.subscribeToMovie(subscribeMovie);
    res.send(data);
})

module.exports = router;