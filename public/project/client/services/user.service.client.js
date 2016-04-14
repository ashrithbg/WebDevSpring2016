(function()
{
    angular
        .module("ShortKutApp")
        .factory("UserService", UserService);

    function UserService($http,$location,$rootScope)
    {
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
            login:login,
            loggedIn:loggedIn,
            findUserPostLikes:findUserPostLikes,
            findUserShortLikes:findUserShortLikes

        };
        return service;

        function loggedIn(){
            if($rootScope.currentUser == null){
                $location.url("/");
            }
        }
        function login(credentials) {
            return $http.post("/api/project/login", credentials);
        }

        function findAllUsers()
        {
            return $http.get('/api/project/user');
        }
        function findUserByCredentials(username, password) {

            return $http.post('/api/project/user/login',{'username':username,'password':password});

        }

        function deleteUserById(userId){
            return $http.delete('/api/project/user/'+userId);

        }
        function createUser (user) {
            return $http.post('/api/project/user',user);

        }

        function updateUser (userId, user) {
            return $http.put('/api/project/user/'+userId,user);
        }



        function findUserById(id) {
            return $http.get('/api/project/user/'+id);
        }
        function findUserByUsername (username) {
            console.log("username = "+username);
            return $http.get('/api/project/user?username='+username);

        }
        function setCurrentUser (user) {
            console.log("current user"+JSON.stringify(user));
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http.get("/api/project/user/loggedin");
        }

        function findUserShortLikes(userId){
            return $http.get("/api/project/user/"+userId+"/shorts/likes");
        }
        function findUserPostLikes(userId){
            return $http.get("/api/project/user/"+userId+"/posts/likes");
        }

    }
})();