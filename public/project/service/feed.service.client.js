(function(){
    angular
        .module("ShortKutApp")
        .factory("FeedService", FeedService);


    function FeedService(PostService,ShortService,UserService) {

        var service = {
            getFollowerPosts: getFollowerPosts,
            getFollowerShorts: getFollowerShorts,
            getUserFeed:getUserFeed
        };

        return service;
        function getFollowerPosts(){
            var user = UserService.getCurrentUser();
            var followers = user.followers;
            var followerPosts=[];
            for(var f in followers) {
                PostService.findAllPostsByUser(followers[f]._id, function(posts){
                    for(var p in posts){
                        followerPosts.push(posts[p]);
                    }
                });
            }
            return followerPosts;

        }

        function getFollowerShorts(){

            var user = UserService.getCurrentUser();
            var followers = user.followers;
            var followerShorts=[];
            for(var f in followers) {
               ShortService.findShortsForUser(followers[f]._id, function(shorts){
                   for(var s in shorts){
                       followerShorts.push(shorts[s]);
                   }
               });
            }
            return followerShorts;
        }

        function getUserFeed(){
            console.log("In get feed by user");
            var posts = getFollowerPosts();
            var shorts = getFollowerShorts();
            console.log("posts"+JSON.stringify(posts));
            console.log("shorts"+JSON.stringify(shorts));

            return {posts:posts,shorts:shorts};

        }

    }



})();