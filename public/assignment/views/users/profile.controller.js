(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService)
    {
        $scope.update = update;
        $scope.user = UserService.getCurrentUser()
        function update(){
            UserService.setCurrentUser($rootScope.user);
        }
    }
})();



