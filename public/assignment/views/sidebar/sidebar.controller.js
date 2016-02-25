(function() {
    var app = angular.module("FormBuilderApp", ["ngRoute"]);

    app.controller("SidebarController", SidebarController);

    function SidebarController($scope,$location) {
        $scope.hello = "Hello World from AngularJS";
        $scope.$location= $location;

        console.log("In sidebar Controller");


    }

})();