(function() {
    var app = angular.module("FormBuilderApp");

    app.controller("SidebarController", sidebarController);

    function sidebarController($scope,$location) {

        $scope.$location= $location;


        console.log("In sidebar Controller");


    }

})();