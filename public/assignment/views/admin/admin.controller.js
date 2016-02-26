(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController($scope, $location, $routeParams,$rootScope, FormService){
        $scope.admin = admin;

        function admin(){
            console.log("admin controller");
        }
    }
})();