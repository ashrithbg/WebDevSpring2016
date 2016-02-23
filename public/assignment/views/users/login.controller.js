(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope,$location, $routeParams,$rootScope, UserService)
    {
        $scope.login = login;
        $scope.id = $routeParams.id;
        $scope.user = UserService.findUserById($routeParams.id);

        function login(){
            $rootScope = UserService.findUserByCredentials($rootScope.user);
        }
    }
})();