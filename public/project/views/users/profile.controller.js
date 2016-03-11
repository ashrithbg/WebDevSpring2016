"use strict";
(function(){
    angular
        .module("ShortKutApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService,ShortService,PostService)
    {   UserService.logged_in();
        console.log("In profile controller");
        $scope.profile = UserService.getCurrentUser();
        ShortService.getShortsByUser($scope.profile.id,function(shorts){
            $scope.shorts = shorts;
        });
        PostService.findAllPostsByUser($scope.profile.id,function(posts){
            $scope.posts = posts;
        });
        $scope.update = update;

        function update(){
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



