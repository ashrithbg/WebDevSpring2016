(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope)
    {
        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];
        var service = {
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser

        };
        return service;

        function findAllUsers(callback)
        {
            return users;
        }
        function findUserByCredentials(username, password) {
            for (var u in users) {
                if (users[u].username === username &&
                        users[u].password === password) {
                    return users[u];
                }
            }
            return null;
        }

        function deleteUserById(userId,callback){

            var user = findUserById(userId);
            if(user!=null)
                users.splice(users.indexOf(user),1);
            else{
                return null
            }
        }
        function createUser (user, callback) {
            var user = {
                username: user.username,
                password: user.password
            };
            users.push(user);
            return user;
        }

        function updateUser (userId, user, callback) {
            var user = findUserById (userId);
            if (user != null) {
                user.firstName = currentUser.firstName;
                user.lastName = currentUser.lastName;
                user.password = currentUser.password;
                return user;
            } else {
                return null;
            }
        }
        function findUserById(id) {
            return users[id];
        }
        function findUserByUsername (username, callback) {
            for (var u in users) {
                if (users[u].username === username) {
                    return users[u];
                }
            }
            return null;
        }
        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

    }
})();