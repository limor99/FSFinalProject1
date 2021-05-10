const jwt = require('jsonwebtoken');

/**
 * This function check if user has autorizations that include:
 * 1. token
 * 2. has permission to specific action
 * 3. expired - session time out
 *  
 * @param {*} permissions - all users's permissions
 * @returns 
 */

const checkAuth =  (permission) =>{
    return function(req, resp, next){
    console.log(permission)
    
        let response = {
            success: false,
            msg: "Authorization failed"
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
                    const permissions = userData.permissions;
                    if(permissions.includes(permission)){
                        next();
                    }
                    else{
                        resp.json(response);
                    }
                }
            })
        }
        else{
            resp.json(response);
        }
    }
}


module.exports = checkAuth;

