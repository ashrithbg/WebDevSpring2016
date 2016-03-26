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
            YoutubeService.findShortById(id).then(renderDetails,renderError);
        }

        function renderDetails(response) {
            if(response!=null)
                vm.details = response.data[0];
        }
        function renderError(err){
            console.log("Error while retrieving search details"+err);
        }
    }
})();