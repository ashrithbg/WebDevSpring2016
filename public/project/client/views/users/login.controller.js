"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("LoginController",LoginController);

    function LoginController($scope,$location, $rootScope,UserService)
    {
        $scope.login = login;
        $scope.$location = $location;


        function login (user) {
            UserService.findUserByCredentials(user.username,
                user.password).then(function(response){
                if (response) {
                    console.log(response);
                    //UserService.setCurrentUser(found_user);
                    $rootScope.currentUser = response.data;
                    $location.url("/profile");
                }
            },function(err){
                console.log("Error logging in"+err);
            });

        }
    }
})();