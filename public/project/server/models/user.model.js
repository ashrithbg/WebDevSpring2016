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
        userUnlikesShort:userUnlikesShort,
        findShortsLikedByUser:findShortsLikedByUser,
        findPostsLikedByUser:findPostsLikedByUser,
        findUsersByIds:findUsersByIds,
        addToFollowing:addToFollowing,
        addToFollowers:addToFollowers,
        removeFromFollowing:removeFromFollowing,
        removeFromFollowers:removeFromFollowers,
        findFollowersById:findFollowersById,
        findFollowingById:findFollowingById,
        userFavoritedPost:userFavoritedPost,
        userUnFavoritedPost:userUnFavoritedPost

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
                console.log("In user model short id ###"+short.ytID);
                doc.shortLikes.push (short.ytID);

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
    function userUnlikesShort(userId,short){

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add movie id to user likes
                console.log("In user model short id"+short.ytID);
                doc.shortLikes.splice(doc.shortLikes.indexOf(short.ytID),1);

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
                console.log(JSON.stringify(err));
                deferred.reject(err);
            }
            else{
                console.log(JSON.stringify(user));
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


        user.type = 'project';
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
                found_user.save (function (err, found_user) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        console.log("In user.model.js",JSON.stringify(found_user));
                        deferred.resolve (found_user);
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

    function findShortsLikedByUser(userId){
        var deferred = q.defer();
        console.log("User id "+userId);
        UserModel.findById(userId,function(err, found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(found_user.shortLikes);
            }
        });
        return deferred.promise;


    }

    function findPostsLikedByUser(username){
        var deferred = q.defer();
        UserModel.findOne({"username":username},function(err, found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(found_user.postLikes);
            }
        });
        return deferred.promise;

    }

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find({
            _id: {$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }


    function addToFollowing(follower,following){
        var deferred = q.defer();
        UserModel.findById(follower,function(err, found_user){
           if(err){
               deferred.reject(err);
           }
           else{
               if(found_user){
                   var followingUsers = found_user.following;
                   followingUsers.push(following);
                   found_user.save(function(err,updated_user){
                       if(err){
                           deferred.reject(err);
                       }
                       else{
                           deferred.resolve(updated_user.following);
                       }

                   });
               }
           }

       });
        return deferred.promise;

    }

    function addToFollowers(following,follower){
        var deferred = q.defer();
        UserModel.findById(following,function(err, found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                if(found_user){
                    var followers = found_user.followers;
                    followers.push(follower);
                    found_user.save(function(err,updated_user){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(updated_user.followers);
                        }

                    });
                }
            }

        });
        return deferred.promise;

    }
    function removeFromFollowing(follower,following){
        var deferred = q.defer();
        UserModel.findById(follower,function(err, found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                if(found_user){
                    var followingUsers = found_user.following;
                    followingUsers.splice(followingUsers.indexOf(following),1);
                    found_user.save(function(err,updated_user){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(updated_user.following);
                        }

                    });
                }
            }

        });
        return deferred.promise;

    }

    function removeFromFollowers(following,follower){
        var deferred = q.defer();
        UserModel.findById(following,function(err, found_user){
            if(err){
                deferred.reject(err);
            }
            else{
                if(found_user){
                    var followers = found_user.followers;
                    followers.splice(followers.indexOf(follower),1);
                    found_user.save(function(err,updated_user){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(updated_user.followers);
                        }

                    });
                }
            }

        });
        return deferred.promise;

    }
    function findFollowersById(user){
        var deferred = q.defer();
        UserModel.findById(user,function(err,found_user){
            if(err)
                deferred.reject(err);
            else{
                deferred.resolve(found_user.followers);
            }

        });
        return deferred.promise;
    }
    function findFollowingById(user){
        var deferred = q.defer();
        console.log("in findFollowingById User id is :",user);
        UserModel.findById(user,function(err,found_user){
            if(err)
                deferred.reject(err);
            else{
                console.log("following found",JSON.stringify(found_user.following));
                deferred.resolve(found_user.following);
            }

        });
        return deferred.promise;

    }

    function userFavoritedPost(postId,username){
        var deferred = q.defer();
        UserModel.findOne({"username":username},function(err, doc){
            if(err)
                deferred.resolve(err);
            else{
                if(doc){
                    doc.postLikes.push(postId);
                    doc.save(function(err,docs){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(docs.postLikes);
                        }

                    });

                }
            }
        });
        return deferred.promise;
    }

    function userUnFavoritedPost(postId,username){
        var deferred = q.defer();
        UserModel.findOne({"username":username},function(err, doc){
            if(err)
                deferred.resolve(err);
            else{
                if(doc){
                    doc.postLikes.splice(doc.postLikes.indexOf(postId),1);
                    doc.save(function(err,docs){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(docs.postLikes);
                        }

                    });

                }
            }
        });
        return deferred.promise;
    }





};