var users = require("./user.mock.json");
module.exports=function(){
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
    function findAllUsers(callback)
    {
        callback(users);
    }
    function findUserByCredentials(username, password,callback) {
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password) {
                callback(users[u]);
            }
        }
        callback(null);

    }

    function deleteUserById(userId,callback){

        var user = findUserById(userId);
        if(user!=null)
            users.splice(users.indexOf(user),1);
        callback(users);
    }
    function createUser (user, callback) {
        var user = {
            username: user.username,
            password: user.password,
            email: user.email
        };
        users.push(user);
        callback(user);
    }

    function updateUser (userId, user, callback) {
        var found_user = findUserById (userId);
        if (user != null) {
            found_user.username = user.username;
            found_user.firstName = user.firstName;
            found_user.lastName = user.lastName;
            found_user.password = user.password;
            found_user.email = user.email;
            callback(found_user);

        } else {
            callback(null);
        }
    }


    function findUserById(id) {
        return users[id];
    }
    function findUserByUsername (username) {
        for (var u in users) {
            if (users[u].username === username) {
                return users[u];
            }
        }
        return null;
    }





}