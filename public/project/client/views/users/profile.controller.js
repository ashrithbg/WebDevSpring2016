"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService,ShortService,PostService)
    {   UserService.loggedIn();
        console.log("In profile controller");
        $scope.profile= UserService.getCurrentUser();
        ShortService.getShortsByUser($scope.profile._id).then(function(response){
            $scope.shorts = response.data;
        },function(err){
            console.log("Error getting shorts for user"+err);
        });
        PostService.findAllPostsByUser($scope.profile._id).then(function(response){
            $scope.posts = response.data;
        }, function(err){
            console.log("Error getting posts for user"+err);
        });
        $scope.update = update;

        function update(){
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



