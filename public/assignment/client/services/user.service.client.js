(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

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
            loggedIn:loggedIn

        };
        return service;

        function loggedIn(){
            if($rootScope.currentUser == null){
                $location.url("/");
            }
        }
        function login(user) {
            console.log("user"+JSON.stringify(user));
            return $http.post("/api/assignment/user/login",user);
        }

        function findAllUsers(){
            return $http.get('/api/assignment/user');
        }
        //function findUserByCredentials(username, password) {
        //
        //    return $http.post('/api/assignment/user/login',{'username':username,'password':password});
        //
        //}

        function deleteUserById(userId){
            return $http.delete('/api/assignment/user/'+userId);

        }
        function createUser (user) {
            return $http.post('/api/assignment/user/register',user);

        }

        function updateUser (userId, user) {
            return $http.put('/api/assignment/user/'+userId,user);
        }



        function findUserById(id) {
            return $http.get('/api/assignment/user/'+id);
        }
        function findUserByUsername (username) {
            console.log("username = "+username);
            return $http.get('/api/assignment/user?username='+username);

        }
        function setCurrentUser (user) {
            console.log("current user"+JSON.stringify(user));
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $http.get("/api/assignment/user/loggedin");
        }

    }
})();