"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("RegisterController", registerController);

    function registerController($location, $scope, UserService) {
        $scope.error = null;
        $scope.register = register;

        function register(user) {
            $scope.error = null;
            if (user == null) {
                $scope.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.confirmPassword) {
                $scope.error = "Please provide a password";
                return;
            }
            if (user.password != user.confirmPassword) {
                $scope.error = "Passwords must match";
                return;
            }
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.error = "User already exists";
                return;
            }
            UserService.createUser($scope.user,function(newUser){
                UserService.setCurrentUser(newUser);
            });

            $location.url("/profile");
        }
    }
})();