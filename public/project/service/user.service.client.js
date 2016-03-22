(function()
{
    angular
        .module("ShortKutApp")
        .factory("UserService", UserService);

    function UserService($location,$rootScope)
    {
        var users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["Director"],"followers":[{"_id":234},{"_id":345},{"_id":456}],following:[{"_id":345},{"_id":456}] },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["Actor"],"followers":[{"_id":123},{"_id":345},{"_id":456}],following:[{"_id":567},{"_id":123}]},
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["Actor"], followers:[],following:[]},
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["Producer"], followers:[{"_id":123},{"_id":234},{"_id":345}],following:[]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["Cinematographer"],followers:[],following:[]}
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
            getCurrentUser: getCurrentUser,
            logged_in:logged_in,
            getTrendingUsers: getTrendingUsers

        };
        return service;

        function logged_in(){
            if(typeof $rootScope.currentUser === 'undefined') {
                $location.url("/home");
            }
        }
        function getTrendingUsers(callback){
            var trendingUsers = users;
            trendingUsers.sort(function(a, b) {
                return parseFloat(a.followers) - parseFloat(b.followers);
            });
            callback(trendingUsers);
        }
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
        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

    }
})();