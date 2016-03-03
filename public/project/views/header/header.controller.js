"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("HeaderController",headerController);

    function headerController($location, $scope) {
        $scope.$location = $location;
        //$scope.logout = logout;
        //
        //function logout() {
        //    UserService.setCurrentUser(null);
        //
        //    $location.url("/home");
        //}
    }
})();