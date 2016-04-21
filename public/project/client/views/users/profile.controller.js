"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, ShortService)
    {
        var vm = this;
        vm.update = update;
        vm.follow = follow;

        function init() {
            UserService.getCurrentUser().then(function (response) {
                vm.profile = response.data;
                vm.profileHeader = angular.copy(vm.profile, vm.profileHeader);
                vm.shortLikes = [];
                vm.reviews = [];
                vm.following = vm.profile.following;
                vm.followers = vm.profile.followers;

                var userId = response.data._id;
                UserService.findUserShortLikes(userId).then(
                    function (response) {
                        var short_likes = response.data;
                        for (var liker in short_likes) {
                            ShortService.findShortById(short_likes[liker]).then(function (response) {
                                vm.shortLikes.push(response.data);
                            }, function (err) {
                                console.log("Error while retrieving likes", err);
                            });
                        }

                    }, function (err) {
                        console.log("Error while retrieving short liked by user" + JSON.stringify(err));
                    });

                ShortService.findUserReviews(userId).then(function (response) {
                    console.log("Reviews found", JSON.stringify(response.data));
                    vm.userReviews = response.data;
                }, function (err) {
                    console.log("Error retrieving profile", JSON.stringify(err));
                });

            }, function (err) {
                console.log("Error while retrieving profile" + JSON.stringify(err));
            });

        }

        init();

        function update(){
            UserService.updateUser($rootScope.currentUser._id,vm.profile).then(
                function(response){
                    UserService.setCurrentUser(response.data);
                    vm.profile = response.data;
                    vm.profileHeader = response.data;
                }, function(err){
                    console.log("Error updating profile"+console.log(err));
                });
        }


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



    }
})();



