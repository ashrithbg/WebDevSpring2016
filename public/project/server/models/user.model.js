var q = require("q");
module.exports=function(db, mongoose){


    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('ProjectUser', UserSchema);

    var api={
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUser:updateUser,
        deleteUserById:deleteUserById,
        findAllUsers:findAllUsers,
        findUserByUsername:findUserByUsername,
        userLikesShort: userLikesShort,
        userReviewsShort: userReviewsShort,
        userCommentsOnShort: userCommentsOnShort
    };
    return api;

    function userLikesShort(userId,short){

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                doc.likes.push (short.shortId);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred.promise;

    }
    function userCommentsOnShort(userId, shortId, comment){

    }

    function userReviewsShort(userId, shortId, review){

    }




    function findAllUsers()
    {   var deferred = q.defer();

        UserModel.find(function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);

            }
        });
        return deferred.promise;
    }
    function findUserByCredentials(credentials) {

        console.log("credentials"+JSON.stringify(credentials));
        var deferred = q.defer();
        UserModel.findOne({'username':credentials.username,'password':credentials.password},function(err,user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }

        });
        return deferred.promise;
    }

    function deleteUserById(userId){

        var deferred = q.defer();
        UserModel.remove({"_id":userId}, function(err,users){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }
    function createUser (user) {

        var deferred = q.defer();
        console.log(JSON.stringify(user));
        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function updateUser (userId, user) {
        console.log("userId"+userId);
        console.log("user obj",JSON.stringify(user));
        var deferred = q.defer();
        UserModel.findById({"_id":userId},function(err,found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                found_user.username = user.username;
                found_user.firstName = user.firstName;
                found_user.lastName = user.lastName;
                found_user.password = user.password;
                found_user.description = user.description;
                found_user.roles = user.roles;
                found_user.dob = user.dob;

                found_user.save(function(err,updated_user){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(updated_user);
                    }

                });
            }

        });
        return deferred.promise;

    }


    function findUserById(id) {

        var deferred = q.defer();
        UserModel.findById({"_id":id},function(err,found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(found_user);
            }

        });
        return deferred.promise;

    }
    function findUserByUsername (username) {
        console.log("User name "+username);
        var deferred = q.defer();
        UserModel.findOne({"username":username},function(err,found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(found_user);
            }

        });
        return deferred.promise;
    }


};