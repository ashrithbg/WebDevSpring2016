"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope,UserService){
        UserService.logged_in();
        $scope.admin = admin;

        //if(typeof $rootScope.currentUser === 'undefined'){
        //
        //    $location.url("/home");
        //}

        function admin(){
            console.log("In admin");
        }
    }
})();