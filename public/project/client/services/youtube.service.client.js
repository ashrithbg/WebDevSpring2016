(function(){
    angular
        .module("ShortKutApp")
        .factory("YoutubeService", YoutubeService);

    function YoutubeService($http,$sce){
        var results=[];
        var service={
            findShortsByQuery : findShortsByQuery,
            listResults:listResults,
            findShortById: findShortById
        };
        return service;

        function findShortsByQuery(query,callback) {

                $http.get('https://www.googleapis.com/youtube/v3/search', {
                        params: {
                            key: 'AIzaSyCHZ1oUry1vObeQXEjnxtlIWClMAlsLOYY',
                            type: 'video',
                            maxResults: '8',
                            part: 'id,snippet',
                            fields: 'items/id,items/snippet/title,items/snippet/description,' +
                            'items/snippet/thumbnails/default,items/snippet/channelTitle',
                            q: query
                        }
                    })
                    .success( function (data) {
                        callback(listResults(data));

                    })
                    .error( function () {
                      callback(null);
                    });




        }
        function listResults(data){
            results.length = 0;
            for (var i = data.items.length - 1; i >= 0; i--) {
                results.push({
                    id: data.items[i].id.videoId,
                    title: data.items[i].snippet.title,
                    description: data.items[i].snippet.description,
                    url:$sce.trustAsResourceUrl("https://www.youtube.com/embed/"+data.items[i].id.videoId),
                    author: data.items[i].snippet.channelTitle
                });
            }
            return results;

        }
        function findShortById(id,callback) {
            $http.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        key: 'AIzaSyCHZ1oUry1vObeQXEjnxtlIWClMAlsLOYY',
                        q:id,
                        part: 'id,snippet'
                    }
                })
                .success( function (data) {
                    callback(listResults(data));

                })
                .error( function () {
                    callback(null);
                });



        }

    }

})();