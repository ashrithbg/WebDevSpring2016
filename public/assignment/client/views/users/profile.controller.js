"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService)
    {   UserService.loggedIn();
        $scope.profile = UserService.getCurrentUser();
        //console.log("profile"+JSON.stringify(UserService.getCurrentUser()));
        $scope.update = update;

        function update(){
            console.log("update"+$scope.profile.username);
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



