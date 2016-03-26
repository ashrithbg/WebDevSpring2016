(function(){
    angular
        .module("ShortKutApp")
        .factory("YoutubeService", YoutubeService);

    function YoutubeService($http,$sce){
        var results=[];
        var service={
            findShortsByQuery : findShortsByQuery,
            findShortById: findShortById
        };
        return service;

        function findShortsByQuery(query) {
           return $http.get("/api/project/search/"+query);
        }

        function findShortById(id) {
            return $http.get("/api/project/search/"+id);

        }

    }

})();