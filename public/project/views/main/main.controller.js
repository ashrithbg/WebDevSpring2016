"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("MainController",MainController);

    function MainController($scope,$location) {
        $scope.$location = $location;


        console.log("In Main Controller");

    }

})();