(function()
{
    angular
        .module("ShortKutApp")
        .factory("UserService", UserService);
    //
    //function UserService($http,$location,$rootScope)
    //{
    //    var service = {
    //        findAllUsers : findAllUsers,
    //        findUserById : findUserById,
    //        findUserByCredentials:findUserByCredentials,
    //        findUserByUsername : findUserByUsername,
    //        createUser:createUser,
    //        deleteUserById:deleteUserById,
    //        updateUser:updateUser,
    //        setCurrentUser: setCurrentUser,
    //        getCurrentUser: getCurrentUser,
    //        login:login,
    //        loggedIn:loggedIn,
    //        findUserPostLikes:findUserPostLikes,
    //        findUserShortLikes:findUserShortLikes
    //
    //    };
    //    return service;
    //
    //    function loggedIn(){
    //        if($rootScope.currentUser == null){
    //            $location.url("/");
    //        }
    //    }
    //    function login(credentials) {
    //        return $http.post("/api/project/login", credentials);
    //    }
    //
    //    function findAllUsers()
    //    {
    //        return $http.get('/api/project/user');
    //    }
    //    function findUserByCredentials(username, password) {
    //
    //        return $http.post('/api/project/user/login',{'username':username,'password':password});
    //
    //    }
    //
    //    function deleteUserById(userId){
    //        return $http.delete('/api/project/user/'+userId);
    //
    //    }
    //    function createUser (user) {
    //        return $http.post('/api/project/user',user);
    //
    //    }
    //
    //    function updateUser (userId, user) {
    //        return $http.put('/api/project/user/'+userId,user);
    //    }
    //
    //
    //
    //    function findUserById(id) {
    //        return $http.get('/api/project/user/'+id);
    //    }
    //    function findUserByUsername (username) {
    //        console.log("username = "+username);
    //        return $http.get('/api/project/user?username='+username);
    //
    //    }
    //    function setCurrentUser (user) {
    //        console.log("current user"+JSON.stringify(user));
    //        $rootScope.currentUser = user;
    //    }
    //
    //    function getCurrentUser () {
    //        return $http.get("/api/project/user/loggedin");
    //    }
    //
    //    function findUserShortLikes(userId){
    //        return $http.get("/api/project/user/"+userId+"/shorts/likes");
    //    }
    //    function findUserPostLikes(userId){
    //        return $http.get("/api/project/user/"+userId+"/posts/likes");
    //    }
    //
    //}



    function UserService($http,$location,$rootScope)
    {
        var service = {
            findAllUsers : findAllUsers,
            findUserById : findUserById,
            //findUserByCredentials:findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            login:login,
            loggedIn:loggedIn,
            logout:logout,
            register:register,
            findUserShortLikes:findUserShortLikes,
            findUserPostLikes:findUserPostLikes,
            getFollowers:getFollowers,
            followUser:followUser,
            unfollowUser:unfollowUser,
            getFollowing:getFollowing


        };
        return service;

        function loggedIn(){
            if($rootScope.currentUser == null){
                $location.url("/");
            }
        }
        function login(user) {
            console.log("user"+JSON.stringify(user));
            return $http.post("/api/project/user/login",user);
        }

        function findAllUsers(){
            return $http.get('/api/project/users');
        }
        //function findUserByCredentials(username, password) {
        //
        //    return $http.post('/api/assignment/user/login',{'username':username,'password':password});
        //
        //}

        function deleteUserById(userId){
            return $http.delete('/api/project/user/'+userId);

        }
        function register (user) {
            return $http.post('/api/project/user/register',user);

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
        function logout(){
            return $http.post("/api/project/user/logout");
        }


        function findUserShortLikes(userId){
            return $http.get("/api/project/user/"+userId+"/shorts/likes");
        }
        function findUserPostLikes(userId){
            return $http.get("/api/project/user/"+userId+"/posts/likes");
        }

        function followUser(currentUserId, user){
            return $http.post("/api/project/user/"+currentUserId+"/follow",user);
        }
        function unfollowUser(currentUserId, user){
            return $http.post("/api/project/user/"+currentUserId+"/unfollow",user);
        }
        function getFollowers(currentUserId){
            return $http.get("/api/project/user/"+currentUserId+"/followers");
        }
        function getFollowing(currentUserId){
            return $http.get("/api/project/user/"+currentUserId+"/following");
        }

    }
})();