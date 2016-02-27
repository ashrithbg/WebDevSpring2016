"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService)
    {   $scope.profile = UserService.getCurrentUser();
        $scope.update = update;
        function update(){
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



