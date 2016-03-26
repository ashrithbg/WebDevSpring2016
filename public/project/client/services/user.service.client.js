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
            loggedIn:loggedIn

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

            return $http.get('/api/project/user?username='+username+"&password="+password);

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
            $http.get('/api/project/user/'+id);
        }
        function findUserByUsername (username) {
            $http.get('/api/project/user?username='+username);

        }
        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

    }
})();