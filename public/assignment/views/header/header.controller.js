(function(){
    angular
        .module("LoginExample")
        .controller("HeaderController", headerController);

    function headerController($location, $rootScope, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        $scope.username = UserService.getCurrentUser()


        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();