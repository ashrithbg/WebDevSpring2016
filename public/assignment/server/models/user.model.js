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
    function findUserByCredentials(credentials) {

        console.log("credentials assignment"+JSON.stringify(credentials));
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
        console.log("In create user user.model.js");
        var deferred = q.defer();
        console.log("In user model createUser "+JSON.stringify(user));
        if(user.emails)
            user.emails=user.emails.split(",");
        // insert new user with mongoose user model's create()
        user.type = 'assignment';
        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                console.log("Error while creating user in user model"+ JSON.stringify(err));
                deferred.reject(err);
            } else {
                // resolve promise
                console.log("In createUser model"+doc);
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
                    found_user.emails = user.emails;
                    found_user.phones = user.phones;
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
                console.log("Found user",JSON.stringify(found_user));
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
                console.log("in find user by username",JSON.stringify(found_user));
                deferred.resolve(found_user);
            }

        });


        return deferred.promise;
    }





};