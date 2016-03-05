(function(){

    angular
        .module("ShortKutApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $routeParams, $location, VimeoService) {
        console.log("In search controller");

        var query = $routeParams.query;
        console.log(query);
        if(query) {
            search(query)
        }
        $scope.search = search;

        function search(query) {
            var url=VimeoService.findShortsByQuery(query, renderShorts);
        }

        function renderShorts(shorts) {
            $scope.shorts=[];
            $scope.shorts.push(shorts);
        }
    }
})();