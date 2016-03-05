(function(){
    angular
        .module("ShortKutApp")
        .factory("VimeoService", VimeoService);

    function VimeoService($http,$sce){
        $http.defaults.headers.common.Authorization = 'bearer e32142e73b82e7066309807901669fe7';
        var service={
            findShortsByQuery : findShortsByQuery,
            findShortsById: findShortsById
        };
        return service;

        function findShortsByQuery(query,callback) {
            console.log("In findShorts");

            $http({
                method: 'GET',
                url: 'https://api.vimeo.com/me/videos?query='+query
            }).then(function successCallback(response) {

                callback(construct_response(response));

            }, function errorCallback(response) {

            });

        }
        function findShortsById(id,callback) {

            $http({
                method: 'GET',
                url: 'https://api.vimeo.com/me/videos?'+id
            }).then(function successCallback(response) {

                callback(construct_response(response));

            }, function errorCallback(response) {

            });

        }
        function construct_response(response) {
            var response_data = response.data.data[0]
            var short = {
                id: response_data.uri.slice(8),
                name: response_data.name,
                desc: response_data.description,
                url: $sce.trustAsResourceUrl("http://player.vimeo.com/video/" + response_data.uri.slice(8))
            };
            return short;
        }

    }

})();