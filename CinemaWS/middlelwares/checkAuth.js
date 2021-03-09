const jwt = require('jsonwebtoken');

const checkAuth = (req, resp, next) =>{
    
        let response = {
            success: false,
            message: "Authorization failed"
        }

        let authHeader = req.headers.authorization;

        if(authHeader){
            let token = authHeader.split(' ')[1];

            jwt.verify(token, "cinemaWsKey", (err, userData) =>{
                if(err){
                    resp.json(response);
                }
                else{
                    console.log({userData});
                    next();
                }
            })
        }
        else{
            resp.json(response);
        }
    
}

module.exports = checkAuth;

