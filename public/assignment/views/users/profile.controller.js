(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $routeParams,$rootScope, UserService)
    {
        $scope.update = update;
        $scope.id = $routeParams.id;
        $scope.user = UserService.findUserById($routeParams.id);

        function update(){
            $rootScope = UserService.updateUser($rootScope.user);
        }
    }
})();