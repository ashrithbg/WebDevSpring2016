"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService)
    {
        UserService.logged_in();
        $scope.profile = UserService.getCurrentUser();
        $scope.update = update;

        function update(){
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



