"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",headerController);

    function headerController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

            function logout() {
            UserService.setCurrentUser(null);

            $location.url("/home");
        }
    }
})();