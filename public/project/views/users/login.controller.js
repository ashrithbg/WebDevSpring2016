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
                user.password,
                function(found_user){
                    if (found_user) {
                        console.log(found_user);
                        //UserService.setCurrentUser(found_user);
                        $rootScope.currentUser = found_user;
                        $location.url("/profile");
                    }
                }
            );

        }
    }
})();