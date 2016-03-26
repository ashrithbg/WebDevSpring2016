(function(){

    angular
        .module("ShortKutApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $sce,$routeParams,YoutubeService) {
        console.log("In search controller");
        var query = $routeParams.query;
        console.log(query);
        if(query) {
            search(query)
        }
        $scope.search = search;

        function search(query) {
            var obj = YoutubeService.findShortsByQuery(query).then(renderShorts, renderError);
        }


        function renderShorts(response) {
            var searchResults = [];
            $scope.shorts=response.data;
        }
        function renderError(err){
            console.log("Error while retrieving search results"+JSON.stringify(err));
        }
    }
})();