(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", ['$scope','$rootScope',headerController]);

    function headerController($location, $scope, UserService,$rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;
        console.log("In header controller"+$rootScope.currentUser);
        //$scope.$on("profile",function(){
        //    $scope.username = $rootScope.currentUser.username;
        //});
        //var logged_user=UserService.getCurrentUser();
        //if(logged_user) {
        //    console.log("Current User" + logged_user);
        //
        //    $scope.username = logged_user.username;
        //
        //}
            function logout() {
            UserService.setCurrentUser(null);

            $location.url("/home");
        }
    }
})();