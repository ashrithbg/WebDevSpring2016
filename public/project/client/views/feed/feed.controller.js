"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("FeedController",FeedController);

    function FeedController(UserService,FeedService) {
        var vm = this;
        vm.currentUser = null;

        function init(){

            UserService.getCurrentUser().then(function(response){
                    vm.currentUser = response.data;
                    FeedService.getFollowingPosts(vm.currentUser._id).then(function(response){
                        console.log("response of get following posts",JSON.stringify(response.data));
                        vm.feedPosts = response.data;
                    },function(err){
                        console.log("Error retrieving feed for user",JSON.stringify(err));
                    });
                    FeedService.getFollowingShorts(vm.currentUser._id).then(function(response){
                        console.log("response of get following shorts",JSON.stringify(response.data));
                        vm.feedShorts = response.data;
                    },function(err){
                        console.log("Error retrieving feed for user",JSON.stringify(err));
                    });

                    if(vm.feedPosts.length == 0 && vm.feedShorts.length == 0){
                        vm.nofeed = true;
                    }
                },
                function(err){
                    console.log("Error retrieving feed", JSON.stringify(err));
                }
            )

        }

        init();

    }

})();