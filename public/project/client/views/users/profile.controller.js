"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService, ShortService)
    {   UserService.loggedIn();
        console.log("In profile controller");
        UserService.getCurrentUser().then(function(response){
            $scope.profile= response.data;
            $scope.shortLikes =[];
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
            UserService.findUserPostLikes(userId).then(
                function(response){
                    $scope.postLikes = response.data;

                },function(err){
                    console.log("Error while retrieving short liked by user"+JSON.stringify(err));
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
        $scope.update = update;


        function update(){
            UserService.setCurrentUser($scope.profile);
        }



    }
})();



