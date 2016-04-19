"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, UserService, ShortService)
    {
        $scope.update = update;

        console.log("In profile controller");
        UserService.getCurrentUser().then(function(response){
            $scope.profile= response.data;
            $scope.profileHeader = angular.copy($scope.profile,$scope.profileHeader);
            $scope.shortLikes =[];
            $scope.reviews = [];
            $scope.following = $scope.profile.following;
            $scope.followers = $scope.profile.followers;
            var userId = response.data._id;
            UserService.findUserShortLikes(userId).then(
                function(response){
                    var short_likes = response.data;
                    for(var liker in short_likes){
                        ShortService.findShortById(short_likes[liker]).then(function(response){
                            $scope.shortLikes.push(response.data);
                        },function(err){
                            console.log("Error while retrieving likes",err);
                        });
                    }

                },function(err){
                    console.log("Error while retrieving short liked by user"+JSON.stringify(err));
            });
            //UserService.findUserPostLikes(userId).then(
            //    function(response){
            //        $scope.postLikes = response.data;
            //
            //    },function(err){
            //        console.log("Error while retrieving short liked by user"+JSON.stringify(err));
            //    });
            ShortService.findUserReviews(userId).then(function(response){
                    console.log("Reviews found",JSON.stringify(response.data));
                    $scope.userReviews = response.data;
            },function(err){
                console.log("Error retrieving profile",JSON.stringify(err));
            });

        },function(err){
            console.log("Error while retrieving profile"+JSON.stringify(err));
        });

        //ShortService.getShortsByUser($scope.profile._id).then(function(response){
        //    $scope.shorts = response.data;
        //},function(err){
        //    console.log("Error getting shorts for user"+err);
        //});
        //PostService.findAllPostsByUser($scope.profile._id).then(function(response){
        //    $scope.posts = response.data;
        //}, function(err){
        //    console.log("Error getting posts for user"+err);
        //});



        function update(){
            UserService.updateUser($rootScope.currentUser._id,$scope.profile).then(
                function(response){

                    UserService.setCurrentUser(response.data);

                    $scope.profile = response.data;
                    console.log("profile after update",response.data);
                    $scope.profileHeader = response.data;
                    //$scope.profile.emails = response.data.emails.join(",");
                    //$scope.profile.phones = response.data.phones.join(",");

                }, function(err){
                    console.log("Error updating profile"+console.log(err));
                });
        }



    }
})();



