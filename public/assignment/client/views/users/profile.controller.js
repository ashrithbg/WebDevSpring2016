"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService)
    {   //UserService.loggedIn();
        UserService.getCurrentUser().then(function(response){
            $scope.profile = response.data;
            },function(err){
                console.log("Error getting current user"+JSON.stringify(err));

        });
        //console.log("profile"+JSON.stringify(UserService.getCurrentUser()));
        $scope.update = update;

        function update(){
            console.log("update"+$scope.profile.username);
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



