const User = require('./userModel');
const userFileDal = require('../../DAL/users/usersFile')
const permissionFileDal = require('../../DAL/users/permissionsFile');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

exports.isUserLogin = async function(user){
    let username = user.username;

    let response = {};

    try{
        let existUser = await User.findOne({ username : username});

        //if user not exist or user have no password
        if(existUser == null  || existUser.password === ''){
            response = {
                success: false,
                message: "Authorization failed"
            }

            return response;
        }

        let password = user.password;
        //check if password ok
        let isSamePassword = await bcrypt.compare(password, existUser.password);
        if(!isSamePassword){
            response = {
                success: false,
                message: "Authorization failed"
            }

            return response;

        }

        //Authorize user
        let userId = existUser.id;
        let userData = await this.getUserById(userId);

        const token = jwt.sign({
                id: userId,
                /*firstName: userData.firstName,
                lastName: userData.lastName,*/
                permissions: userData.permissions

            },
            "cinemaWsKey",
            { 
                expiresIn: userData.sessionTimeOut  
            }
        )

        response = {
            success: true,
            message: "Authorization successful",
            token,
            userFullName: `${userData.firstName} ${userData.lastName}`
        }

        return response;

    }
    catch(err){
        console.log(`An error occured while try to login: ${err}`);
        response = {
            succeed: false,
            message: "Authorization failed"
        }

        return response;
        
    }
}

/** get all user with their all data from all sources:
 * 1. user collection from db
 * 2. users.json file
 * 3. permission.json file
 */
exports.getAllUsers = async function(){
    let usersData = null;

    try{
        //1. read all users from user.json file
        let users = await userFileDal.readUsersFromFile();
        
        //2. read all users's permissions from permissions.json
        let usersPermissions = await permissionFileDal.readPermissions();
        
        //3. get all users from DB
        let usersFromDB = await User.find({});
        //4. data shaping
        if(users != undefined && usersPermissions != undefined){
            usersData = users.map(user =>{
                let userPermissions = usersPermissions.filter(permission => permission.id === user.id);
                let userFromDB = usersFromDB.filter(u => u.id === user.id);

            return {
                    id: user.id,
                    firstName: user.firstName, 
                    lastName: user.lastName,
                    username : userFromDB[0].username,
                    sessionTimeOut: user.sessionTimeOut,
                    createdDate : user.createdDate,
                    permissions: userPermissions[0].permissions
                }
                
            })
        }
    }
    catch(err){
        console.log(`An Error occured ${err}`);
    }
    finally{
        return usersData;
    }
}

/** get user by id with all his data from files and db */
exports.getUserById = async function(userId){
    let users = null;
    let user = null;
    users = await this.getAllUsers();
    if(users){
        user = users.filter(user => user.id === userId)[0];
    }
    else{
        console.log(`An error occured while try to read user: ${userId} from file`);
    }

    return user;
}

exports.addNewUser = async function(user){
    let isAdded = false;
    let createdUser = null;
    try{
        // 1. add to DB
        let NewUser = new User(user);
        createdUser = await NewUser.save();
        
        // 2. add new user to users.json file
        let newUser = { "id": createdUser.id,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "username": user.username,
                        "createdDate": new Date().toLocaleDateString('en-GB'),
                        "sessionTimeOut": parseInt(user.sessionTimeOut)
                    }
                    
        let isUserAddedToFile = await userFileDal.addUserToFile(newUser);
                
        // 3. add new user to permisions.json file

        let userPermissions = [];
        user.permissions.viewSubscriptions ? userPermissions.push("View Subscriptions") : null;
        user.permissions.createSubscriptions ? userPermissions.push("Create Subscriptions") : null;
        user.permissions.deleteSubscriptions ? userPermissions.push("Delete Subscriptions") : null;
        user.permissions.updateSubscriptions ? userPermissions.push("Update Subscriptions") : null;
        user.permissions.viewMovies ? userPermissions.push("View Movies") : null;
        user.permissions.createMovies ? userPermissions.push("Create Movies") : null;
        user.permissions.deleteMovies ? userPermissions.push("Delete Movies") : null;
        user.permissions.updateMovies ? userPermissions.push("Update Movies") : null;
       
        let newUserPermisions = { "id": createdUser.id,
                                    "permissions": userPermissions
                                     }
        let isNewUserPermissionAddedToFile = await permissionFileDal.addUserPermissionToFile(newUserPermisions);
       
        isAdded = isUserAddedToFile && isNewUserPermissionAddedToFile;
        
    }
    catch(err){
        console.log(`An error occured while try to add new user: ${user.username} to DB and/or to json files: ${err}`);
        
    }
    finally{
        if(isAdded){
            return createdUser.id;
        }
        return null;
    }
}

/** update the user collection. this function is call when user update his password in db for the first time
 * after the admin create the username 
 */
exports.createAccount = async function(account){
    // isExistAccount = false; //the account created by the admin (only username)
    //let isExistFullAccount = false; //the account created by admin and the user set the password already
    //let isUpdatedAccount = false; //username and pwd exist for user

    let success, msg;
    try{
        //if admin created aleady the username for
        let userAccount = await User.findOne({username: account.username})

        if(userAccount.password === undefined){
            let hashPwd = await bcrypt.hash(account.password, saltRounds);

            let updatedAccount = {
                username: account.username,
                password: hashPwd
            }
            
            if(userAccount != null){
                //isExistAccount = true;
                await User.findByIdAndUpdate(userAccount.id, updatedAccount);
                //isUpdatedAccount = true;
                success = true;
                msg = 'User created, please login';
            }
        }
        else{
            //isExistFullAccount = true;
            success = true;
            msg = 'User exist already, please login';
        }
    }
    catch(err){
        console.log(`An error occured while try to add new account: username: ${account.username}, pwd: ${account.password}`);
        success = false;
        msg = 'An error occured, please try again';
    }
    finally{
        let response = {
            success,
            msg
        }
        return response;
    }

}

/** delete user from all data source: users.json, permissions.json & user collection in db */
exports.deleteUser = async (userId) =>{
    let isDeleted = false;
    let isDeletedFromPermissions = false;
    let isDeletedFromUsersFile = false;
    let isDeleteUserFromDB = false;
    
    // 1. delete from permissions.json file
    let usersPermissions = await permissionFileDal.readPermissions();

    if(usersPermissions != null){
        let indexId = usersPermissions.findIndex(p => p.id === userId);
        if(indexId  > -1){
            usersPermissions.splice(indexId, 1);
            isDeletedFromPermissions = await permissionFileDal.writePermissions(usersPermissions);
        }
    }
    else{
        console.log(`An error occured while try to delete user: ${userId} from permissions.json`)
    }

    // 2. delete from users.json file
    let usersFromFile = await userFileDal.readUsersFromFile();
    if(usersFromFile != null){
        let indexId = usersFromFile.findIndex(user => user.id === userId);
        if(indexId  > -1){
            usersFromFile.splice(indexId, 1);
            let usersToUpdate = usersFromFile;
            isDeletedFromUsersFile = await userFileDal.writeUsersToFile(usersToUpdate);
        }
    }
    else{
        console.log(`An error occured while try to delete user: ${userId} from users.json`)
    }

    // 3. delete from db (users collections)
    try{
    /*    User.findByIdAndDelete(userId, function(err, docs){
            if(err){
                console.log(`An error occured while try to delete user: ${userId} from db, users collection`)
            }
            else{
                isDeleteUserFromDB = true;
            }
        })*/
        await User.findByIdAndDelete(userId)
        isDeleteUserFromDB = true;
    }
    catch(err){
        console.log(`An error occured while try to delete user: ${userId} from db, users collection`)
    }

    if(isDeletedFromPermissions && isDeletedFromUsersFile && isDeleteUserFromDB){
        isDeleted = true;
    }

    return isDeleted;
}

