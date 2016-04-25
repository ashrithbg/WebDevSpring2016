(function(){

    angular
        .module("ShortKutApp")
        .controller("SearchController", SearchController);

    function SearchController($scope,$sce,$routeParams,YoutubeService) {
        console.log("In search controller");
        var vm = this;
        var query = $routeParams.query;
        vm.query = null;

        console.log(query);
        if(query) {
            //UserService.getCurrentUser().then(function(response){
            //    $scope.shortLikes = response.data.shortLikes;
            //},function(err){
            //    console.log("Error retrieving likes after login",JSON.stringify(err));
            //});
            if(query=="")
                return;
            search(query);

        }
        vm.search = search;
        vm.clear = clear;


        function search(query) {

            YoutubeService.findShortsByQuery(query).then(renderShorts, renderError);
        }


        function renderShorts(response) {
            var searchResults = [];
            vm.shorts=response.data;
            vm.query= {};
        }
        function renderError(err){
            console.log("Error while retrieving search results"+JSON.stringify(err));
        }

        function clear(){
            vm.query={};
        }

    }
})();