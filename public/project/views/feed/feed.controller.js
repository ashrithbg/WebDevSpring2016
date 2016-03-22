"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("FeedController",FeedController);

    function FeedController($scope,UserService,FeedService) {
        console.log("In feed controller");
        UserService.logged_in();
        var currentUser = UserService.getCurrentUser();
        $scope.feed = FeedService.getUserFeed();
        console.log("feed"+console.log($scope.feed));
        //$scope.getFeedByUser = getFeedByUser;



        function getFeedByUser(){

            $scope.feed = FeedService.getUserFeed();
        }




    }

})();