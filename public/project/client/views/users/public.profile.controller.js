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
                        vm.public = response.data;
                        publicUserId = vm.public._id;
                        console.log("public user id",publicUserId);
                        vm.followers=response.data.followers;
                        vm.following=response.data.following;
                        return ShortService.findShortsForUser(publicUserId)

                    },
                    function(err){
                        console.log("Error retrieving public profile of user!");
                    }
                ).then(function(response) {

                    vm.shorts = response.data;
                    return PostService.findAllPostsByUser(publicUserId);
                    },
                    function(err){
                        console.log("Error retrieving shorts of user!",JSON.stringify(err));
                    }
                ).then(function(response){
                        vm.posts = response.data;
                        return ShortService.findUserReviews(publicUserId);
                    },
                    function(err){
                        console.log("Error retrieving posts of user!",JSON.stringify(err));
                    }
                ).then(function(response) {

                    vm.reviews = response.data;
                    },
                    function(err) {
                        console.log("Error retrieving reviews of user!", JSON.stringify(err));
                    });

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



