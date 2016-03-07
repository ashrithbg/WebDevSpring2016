"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("UploadController",uploadController);

    function uploadController($scope,$location) {
        $scope.$location = $location;


        console.log("In upload Controller");

    }

})();