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
            var obj = YoutubeService.findShortsByQuery(query, renderShorts);
        }


        function renderShorts(results) {
            var searchResults = [];
           $scope.shorts=results;
        }
    }
})();