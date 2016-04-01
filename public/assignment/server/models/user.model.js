//var users = require("./user.mock.json");

var q = require("q");
module.exports=function(db,mongoose){



    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User',UserSchema);
    var api={
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        updateUser:updateUser,
        deleteUserById:deleteUserById,
        findAllUsers:findAllUsers,
        findUserByUsername:findUserByUsername
    };
    return api;

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
    function findUserByCredentials(username, password) {
        //for (var u in users) {
        //    if (users[u].username === username &&
        //        users[u].password === password) {
        //        console.log(users[u]);
        //        return users[u];
        //    }
        //}
        //return null;

        var deferred = q.defer();
        UserModel.findOne({username:username,password:password},function(err,user){
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

        //var user = findUserById(userId);
        //if(user!=null)
        //    users.splice(users.indexOf(user),1);
        //return users;
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
        //var user = {
        //    username: user.username,
        //    password: user.password,
        //    email: user.email
        //};
        //users.push(user);
        //return user;

        var deferred = q.defer();

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
        //var found_user = findUserById (userId);
        //if (user != null) {
        //    found_user.username = user.username;
        //    found_user.firstName = user.firstName;
        //    found_user.lastName = user.lastName;
        //    found_user.password = user.password;
        //    found_user.email = user.email;
        //    return found_user;
        //
        //} else {
        //    return null;
        //}
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
                    found_user.email = user.email;
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
        //for (var u in users) {
        //    if (users[u].username === username) {
        //        return users[u];
        //    }
        //}
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





}