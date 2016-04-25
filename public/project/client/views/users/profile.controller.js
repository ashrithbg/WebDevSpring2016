"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, $location, UserService, ShortService)
    {
        var vm = this;
        var currentUser = null;
        vm.update = update;
        vm.follow = follow;
        vm.unfollow = unfollow;
        vm.unlike = unlike;
        vm.followers=[];
        vm.following=[];

        function init() {
            UserService.getCurrentUser().then(function (response) {
                vm.profile = response.data;
                currentUser = response.data;
                vm.profileHeader = angular.copy(vm.profile, vm.profileHeader);
                vm.followerCount = vm.profile.followers.length;
                vm.followingCount = vm.profile.following.length;
                vm.shortLikes = [];
                vm.reviews = [];
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


                vm.profile.followers.forEach(function(entry){
                    UserService.findUserByUsername(entry).then(function(response){
                        vm.followers.push(response.data);
                    },function(err){
                        console.log("Error getting follower",JSON.stringify(err));
                    });

                });

                vm.profile.following.forEach(function(entry) {
                    UserService.findUserByUsername(entry).then(function (response) {
                        vm.following.push(response.data);
                    }, function (err) {
                        console.log("Error getting following", JSON.stringify(err));
                    });
                });

                ShortService.findUserReviews(userId).then(function (response) {
                    console.log("Reviews found", JSON.stringify(response.data));
                    vm.userReviews = response.data;

                    //var shortIds = [];
                    //vm.userReviews.forEach(function(entry){
                    //    shortIds.push(entry.shortId);
                    //});

                    //for(var i=0 ;i<vm.userReviews.length;i++){
                    //    ShortService.findShortById(vm.userReviews[i].shortId).then(function(response){
                    //
                    //            vm.userReviews[i].shortTitle = response.data.title;
                    //            vm.userReviews[i].shortUrl = response.data.url;
                    //            console.log("response after modifying userReviews",JSON.stringify(vm.userReviews[i]));
                    //    },function(err){
                    //        console.log("Error retrieving short for this review", JSON.stringify(err));
                    //    });
                    //}
                    //var shortsByReviews = null;
                    //ShortService.findShortsByIds(shortIds).then(function(response){
                    //    shortsByReviews = response.data;
                    //    for(var ur in vm.userReviews){
                    //        for(var short in shortsByReviews){
                    //            if(shortsByReviews[short].ytID == vm.userReviews[ur].shortId){
                    //                console.log("matching short id",shortsByReviews[short].ytID);
                    //                vm.userReviews[ur].shortTitle = shortsByReviews[short].title;
                    //                vm.userReviews[ur].shortUrl = shortsByReviews[short].url;
                    //            }
                    //        }
                    //    }
                    //},function(err){
                    //    console.log("Error retrieiving shorts by reviews",JSON.stringify(err));
                    //});




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
                UserService.followUser(follower,following).then(function(response){
                    vm.following = response.data;
                    vm.followingCount = response.data.length;
                    },function(err){
                    console.log("Error following user",JSON.stringify(err));
                });
            }
            else {
                $location.url("/login");
            }

        }

        function unfollow(follower,following){
            if(currentUser) {
                UserService.unfollowUser(follower, following).then(function (response) {
                    vm.following = response.data;
                    vm.followingCount = response.data.length;
                }, function (err) {
                    console.log("Error following the user", JSON.stringify(err));
                });
            }
            else {
                $location.url("/login");
            }
        }

        function unlike(short){
            if(currentUser) {
                console.log("short to be unliked",short._id);
                console.log(JSON.stringify(vm.shortLikes));
                vm.shortLikes.splice(vm.shortLikes.indexOf(short.ytID),1);
                ShortService
                    .userUnlikesShort(currentUser._id, short);
            } else {
                $location.url("/login");
            }

        }



    }
})();



