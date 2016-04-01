"use strict";
(function(){
    angular
        .module("FormBuilderApp")
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
            UserService.findUserByUsername(user.username).then(
                function(found_user){
                    if (found_user.data != null) {
                        $scope.error = "User already exists";
                        return;
                    }
                    else{
                        UserService.createUser($scope.user).then(function(newUser){
                            console.log("created user");
                            UserService.setCurrentUser(newUser);
                        },function(err){
                            console.log("Error creating user");
                        });

                        $location.url("/profile");

                    }
                }, function(err){
                    console.log("Error authenticatiing user");
            });


        }
    }
})();