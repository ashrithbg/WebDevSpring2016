(function(){


    angular
        .module("ShortKutApp")
        .controller("ShortDetailsController", ShortDetailsController);

    function ShortDetailsController($scope, $http, $routeParams, VimeoService) {

        var vm = this;

        var id = $routeParams.id;
        console.log(id);

        function init() {
            fetchShort(id);
        }
        init();

        function fetchShort(id) {
            VimeoService.findShortsById(id, renderDetails);
        }

        function renderDetails(shorts) {
           // console.log("shorts"+$scope.shorts);
            vm.details = shorts;
        }
    }
})();