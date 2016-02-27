"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, $location, $routeParams,$rootScope, FormService){
        $scope.admin = admin;

        if(typeof $rootScope.currentUser === 'undefined'){

            $location.url("/home");
        }

        function admin(){
            console.log("In admin");
        }
    }
})();