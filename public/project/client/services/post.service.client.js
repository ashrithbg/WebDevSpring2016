(function()
{
    angular
        .module("ShortKutApp")
        .factory("PostService", PostService);

        function PostService($http){

            var service={
                findPostById:findPostById,
                findAllPostsByUser:findAllPostsByUser,
                createPostForUser:createPostForUser,
                deletePostById:deletePostById,
                updatePostById:updatePostById,
                addComment:addComment,
                deleteComment:deleteComment,
                findCommentsByUser:findCommentsByUser,
                findCommentsByUsername:findCommentsByUsername,
                userFavoritesPost:userFavoritesPost,
                userUnfavoritesPost:userUnfavoritesPost,
                findPostsLiked:findPostsLiked
            };

            return service;

            function findAllPostsByUser(userId) {

               var response = $http.get("/api/project/user/"+userId+"/posts");
                console.log("In find all posts by user"+JSON.stringify(response));
                return response;
            }
            function deletePostById(postId){
               return $http.delete("/api/project/post/"+postId)

            }
            function createPostForUser(userId, post){
                return $http.post("/api/project/user/"+userId+"/post",post);

            }
            function updatePostById(postId, newPost){

               return $http.put("/api/project/post/"+postId, newPost);

            }

            function findPostById(postId){
               return $http.get("/api/project/post/"+postId);
            }

            function addComment(postId,comment){
                console.log("In add comment post service client",postId,comment);
                return $http.post("/api/project/post/"+postId+"/comment",comment);
            }
            function deleteComment(postId,commentId){
                return $http.delete("/api/project/post/"+postId+"/comment/"+commentId);
            }

            function findCommentsByUser(userId){
                return $http.get("/api/project/user/:userId/comments");
            }

            function findCommentsByUsername(username){
                return $http.get("/api/project/user/:username/comments");
            }

            function userFavoritesPost(postId,username){
                return $http.post("/api/project/user/"+username+"/post/"+postId+"/favorite");
            }
            function userUnfavoritesPost(postId,username){
                return $http.post("/api/project/user/"+username+"/post/"+postId+"/unfavorite");
            }
            function findPostsLiked(username){
                return $http.get("/api/project/user/"+username+"/posts/likes");

            }

        }
})();

