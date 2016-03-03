"use strict";
(function(){
    angular.
        module("ShortKutApp")
        .controller("SearchController",searchController);
    function searchController($scope){
        console.log("search controller")
        $scope.handleAPILoaded = handleAPILoaded;
        $scope.search = search;
        function handleAPILoaded() {
            $('#search-button').attr('disabled', false);
        }

// Search for a specified string.
        function search() {
            var q = $('#query').val();
            var request = gapi.client.youtube.search.list({
                q: q,
                safeSearch:"strict",
                part: 'snippet'
            });

            request.execute(function(response) {
                var str = JSON.stringify(response.result);
                $('#search-container').html('<pre>' + str + '</pre>');
            });
        }
        //$scope.lorem = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

    }

})();