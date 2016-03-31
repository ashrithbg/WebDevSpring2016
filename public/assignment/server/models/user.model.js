//var users = require("./user.mock.json");
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
    {
        return users;
    }
    function findUserByCredentials(username, password) {
        for (var u in users) {
            if (users[u].username === username &&
                users[u].password === password) {
                console.log(users[u]);
                return users[u];
            }
        }
        return null;


    }

    function deleteUserById(userId,callback){

        var user = findUserById(userId);
        if(user!=null)
            users.splice(users.indexOf(user),1);
        return users;
    }
    function createUser (user) {
        var user = {
            username: user.username,
            password: user.password,
            email: user.email
        };
        users.push(user);
        return user;
    }

    function updateUser (userId, user) {
        var found_user = findUserById (userId);
        if (user != null) {
            found_user.username = user.username;
            found_user.firstName = user.firstName;
            found_user.lastName = user.lastName;
            found_user.password = user.password;
            found_user.email = user.email;
            return found_user;

        } else {
            return null;
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