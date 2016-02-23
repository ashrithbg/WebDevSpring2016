(function() {
    var app = angular.module("FormBuilderApp", ["ngRoute"]);

    app.controller("HeaderController", HeaderController);

    function HeaderController($scope,$location) {
        $scope.hello = "Hello World from AngularJS";

        console.log("In header Controller");


    }

})();