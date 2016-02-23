(function() {
    var app = angular.module("FormBuilderApp", ["ngRoute"]);

    app.controller("MainController", MainController);

    function MainController($scope,$location) {
        $scope.hello = "Hello World from AngularJS";

        console.log("In Main Controller");


    }

})();