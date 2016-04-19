"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("HeaderController",headerController);

    function headerController($location, $scope,$rootScope,UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        //$scope.renderShorts = renderShorts;

        $scope.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();