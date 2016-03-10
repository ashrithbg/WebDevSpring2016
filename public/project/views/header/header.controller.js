"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("HeaderController",headerController);

    function headerController($location, $scope) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.renderShorts = renderShorts;

        function logout() {
            UserService.setCurrentUser(null);

            $location.url("/home");
        }
        function renderShorts(){
            $location.url("/shorts");
        }
    }
})();