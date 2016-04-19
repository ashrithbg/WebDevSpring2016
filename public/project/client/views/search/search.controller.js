(function(){

    angular
        .module("ShortKutApp")
        .controller("SearchController", SearchController);

    function SearchController($scope,$sce,$routeParams,YoutubeService) {
        console.log("In search controller");
        var query = $routeParams.query;
        $scope.query = null;
        console.log(query);
        if(query) {
            //UserService.getCurrentUser().then(function(response){
            //    $scope.shortLikes = response.data.shortLikes;
            //},function(err){
            //    console.log("Error retrieving likes after login",JSON.stringify(err));
            //});

            search(query);

        }
        $scope.search = search;


        function search(query) {
            var obj = YoutubeService.findShortsByQuery(query).then(renderShorts, renderError);
        }


        function renderShorts(response) {
            var searchResults = [];
            $scope.shorts=response.data;
            $scope.query= null;
        }
        function renderError(err){
            console.log("Error while retrieving search results"+JSON.stringify(err));
        }



    }
})();