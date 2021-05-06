const express = require('express');
const router = express.Router();

const subscriptionsBL = require('../models/subscriptions/subscriptionsBL');

router.route('/').get(async function(req, res){
    let data  = await subscriptionsBL.getSubscriptions();
    res.send(data);
})

router.route('/').post(async function(req, res){
    let subscribeMovie = req.body;
    
    let data  = await subscriptionsBL.subscribeToMovie(subscribeMovie);
    res.send(data);
})

module.exports = router;