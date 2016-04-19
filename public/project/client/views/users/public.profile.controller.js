"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("PublicProfileController", publicProfileController);
        function publicProfileController(UserService, $rootScope, $routeParams, ShortService, PostService){
            var vm = this;
            var username = $routeParams.username;
            var publicUserId = null;
            vm.follow = follow;
            vm.unfollow = unfollow;
            var currentUser = $rootScope.currentUser;
            console.log("Username is ",username);
            function init() {
                UserService.findUserByUsername(username).then(function(response){
                        console.log("public profile ... ",response.data);
                        vm.public = response.data;
                        publicUserId = response.data._id;
                        vm.followers=response.data.followers;
                        vm.following=response.data.following;

                    },
                    function(err){
                        console.log("Error retrieving public profile of user!");
                    }
                );

                ShortService.findShortsForUser(publicUserId).then(function(response){
                        vm.shorts = response.data
                    },
                    function(err){
                        console.log("Error retrieving public profile of user!");
                    }
                );

                PostService.findAllPostsByUser(publicUserId).then(function(response){
                        vm.posts = response.data
                    },
                    function(err){
                        console.log("Error retrieving public profile of user!");
                    }
                );

                //ShortService.findAllReviewsByUser(publicUserId).then(function(response){
                //        vm.reviews = response.data;
                //    },
                //    function(err){
                //
                //});

            }
            init();


            function follow(follower,following){
                if(currentUser) {
                    UserService.followUser(follower, following).then(function (response) {

                        vm.followers = response.data;
                    }, function (err) {
                        console.log("Error following the user", JSON.stringify(err));
                    });
                }
                else {
                    $location.url("/login");
                }

            }

            function unfollow(follower,following) {
                if (currentUser){
                    UserService.unfollowUser(follower, following).then(function (response) {
                        vm.followers = response.data;
                    }, function (err) {
                        console.log("Error unfollowing the user", JSON.stringify(err));
                    });
                }
                else {
                    $location.url("/login");
                }

            }



        }
})();



