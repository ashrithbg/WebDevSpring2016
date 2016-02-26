(function() {
    var app = angular.module("FormBuilderApp");

    app.controller("MainController",MainController);

    function MainController($scope,$location) {
        $scope.$location = $location;


        console.log("In Main Controller");


    }

})();