"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("FeedController",FeedController);

    function FeedController($scope,$location,UserService,FeedService) {


        $scope.$location = $location;
        $scope.getFeedByUser = getFeedByUser;
        var curUser = UserService.getCurrentUser();

        function getFeedByUser(curUser){

        }



        console.log("In Main Controller");

    }

})();