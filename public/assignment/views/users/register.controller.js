(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $routeParams, UserService)
    {
        $scope.register = register;
        $scope.id = $routeParams.id;
        $scope.user = UserService.findUserById($routeParams.id);

        function register(){
            $rootScope = UserService.createUser();
        }
    }
})();