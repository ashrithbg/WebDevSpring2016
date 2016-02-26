(function() {
    var app = angular.module("FormBuilderApp");

    app.controller("MainController", ['$scope','$location','$rootScope',MainController]);

    function MainController($scope,$location,$rootScope) {
        $scope.$location = $location;

        console.log("In Main Controller");


    }

})();