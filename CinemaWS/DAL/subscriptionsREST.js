const axios = require('axios');
const subscriptionsWSUrl = ('http://localhost:8000/api/subscriptions/');

exports.getSubscriptions = function(){
    return axios.get(subscriptionsWSUrl);

}

exports.subscribeToMovie = function(subscribeMovie){
    return axios.post(subscriptionsWSUrl, subscribeMovie);

}