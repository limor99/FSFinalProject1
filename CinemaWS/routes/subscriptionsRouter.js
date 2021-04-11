const subscriptionsBL = require('../models/subscriptions/subscriptionsBL');

router.route('/').get(async function(req, res){
    let data  = await subscriptionsBL.getSubscriptions();
    res.send(data);
})