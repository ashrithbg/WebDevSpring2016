(function(){


    angular
        .module("ShortKutApp")
        .controller("SearchDetailsController", SearchDetailsController);

    function SearchDetailsController($scope, $http, $routeParams, YoutubeService) {
        var vm = this;

        var id = $routeParams.id;
        console.log(id);

        function init() {
            fetchShort(id);
        }
        init();

        function fetchShort(id) {
            YoutubeService.findShortById(id, renderDetails);
        }

        function renderDetails(response) {
            if(response!=null)
                vm.details = response[0];
        }
    }
})();