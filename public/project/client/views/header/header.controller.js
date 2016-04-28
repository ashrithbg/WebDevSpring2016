"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("HeaderController",headerController);

    function headerController($location, $scope,$rootScope,UserService) {

        var vm = this;
        //$scope.$location = $location;
        vm.logout = logout;
        //$scope.renderShorts = renderShorts;



        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();