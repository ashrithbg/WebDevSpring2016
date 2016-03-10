(function(){


    angular
        .module("ShortKutApp")
        .controller("ShortDetailsController", ShortDetailsController);

    function ShortDetailsController($scope, $http, $routeParams, ShortService) {
        var vm = this;

        var id = $routeParams.id;
        console.log(id);

        function init() {
            fetchShort(id);
        }
        init();

        function fetchShort(id) {
            ShortService.findShortById(id, renderDetails);
        }

        function renderDetails(response) {
            //console.log("id is"+response.id);
            //console.log("id is"+response.title);
            //console.log("id is"+response.description);
            if(response!=null)
                vm.details = response;
        }
    }
})();