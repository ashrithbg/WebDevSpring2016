"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope,$rootScope,UserService)
    {   //UserService.loggedIn();
        UserService.getCurrentUser().then(function(response){
            console.log("in get current user"+JSON.stringify(response));
            $scope.profile = response.data;

            },function(err){
                console.log("Error getting current user"+JSON.stringify(err));

        });
        $scope.update = update;

        function update(){
            console.log("update"+$scope.profile.username);
            console.log("profile",JSON.stringify($scope.profile));
            UserService.updateUser($rootScope.currentUser._id,$scope.profile).then(
                function(response){

                    UserService.setCurrentUser(response.data);
                    $scope.profile = response.data;
                    //$scope.profile.emails = response.data.emails.join(",");
                    //$scope.profile.phones = response.data.phones.join(",");

                }, function(err){
                console.log("Error updating profile"+console.log(err));
            });

            //UserService.updateUser($scope.profile).then(function(response){
            //    UserService.setCurrentUser(response.data);
            //},function(err){
            //    console.log("Error while updating user"+JSON.stringify(err));
            //});

        }

    }
})();



