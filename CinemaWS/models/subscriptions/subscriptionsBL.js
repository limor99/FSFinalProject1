const subscriptionsDAL = require('../../DAL/subscriptionsREST');

exports.getSubscriptions = async function(){
    let subscriptions = null, response = null;

    try{
        response = await subscriptionsDAL.getSubscriptions();
        subscriptions = response.data;
    }
    catch(err){
        console.log(`An error occured while try to get all movies: ${err}`);
    }

    return subscriptions;
}
