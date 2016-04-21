(function(){
    angular
        .module("ShortKutApp")
        .factory("FeedService", FeedService);


    function FeedService($http) {

        var service = {
            getFollowingPosts: getFollowingPosts,
            getFollowingShorts: getFollowingShorts
        };

        return service;
        function getFollowingPosts(userId){
            return $http.get("/api/project/user/"+userId+"/feed/posts");
        }

        function getFollowingShorts(userId){

            return $http.get("/api/project/user/"+userId+"/feed/shorts");
        }



    }



})();