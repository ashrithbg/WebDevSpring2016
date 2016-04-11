"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("UserHomeController", UserHomeController);

    function UserHomeController($scope,$location) {
        $scope.$location = $location;
    }
})();



