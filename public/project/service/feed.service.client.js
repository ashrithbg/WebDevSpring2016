(function(){
    angular
        .module("ShortKutApp")
        .factory("FeedService", FeedService);


    function FeedService(PostService,ShortService,UserService) {

        var service = {
            getFollowerPosts: getFollowerPosts,
            getFollowerShorts:getFollowerShorts
        }


    }



})();