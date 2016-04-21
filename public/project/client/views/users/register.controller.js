"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.error = null;
        vm.register = register;

        function register(user) {
            vm.error = null;
            if (user == null) {
                vm.error = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                vm.error = "Please provide a username";
                return;
            }
            if (!user.password || !user.confirmPassword) {
                vm.error = "Please provide a password";
                return;
            }
            if (user.password != user.confirmPassword) {
                vm.error = "Passwords must match";
                return;
            }
            
            UserService.findUserByUsername(user.username).then(
                function(found_user){
                    if (found_user.data != null) {
                        vm.error = "User already exists";
                        return;
                    }
                    else{
                        console.log("emails"+user.emails);
                        UserService.register(user).then(function(newUser){
                            console.log("created user");
                            UserService.setCurrentUser(newUser);
                            $location.url("/profile");
                        },function(err){
                            console.log("Error creating user");
                        });
                    }
                }, function(err){
                    console.log("Error authenticatiing user");
                });
        }
    }
})();