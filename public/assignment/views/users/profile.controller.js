(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope,UserService)
    {
        $scope.update = update;
        $scope.profile = UserService.getCurrentUser();
        function update(){
            UserService.setCurrentUser($scope.profile);
        }
    }
})();



