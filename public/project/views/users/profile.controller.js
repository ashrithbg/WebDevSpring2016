"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService)
    {   UserService.logged_in();
        $scope.profile = UserService.getCurrentUser();
        $scope.update = update;
        function update(){
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



