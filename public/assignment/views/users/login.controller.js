(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope,$location,$rootScope, UserService)
    {
        $scope.login = login;
        $scope.$location = $location;


        function login (user) {
            var found_user = UserService.findUserByCredentials(user.username,user.password);
            if (found_user) {
                $rootScope.currentUser = found_user;
               // $rootScope.$broadcast("profile_name");
                console.log(found_user);
                UserService.setCurrentUser(found_user);
                $location.url("/profile");
            }
        }
    }
})();