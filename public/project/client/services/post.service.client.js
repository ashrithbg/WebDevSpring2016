(function()
{
    angular
        .module("ShortKutApp")
        .factory("PostService", PostService);

        function PostService($http){

            //var posts=[
            //    {"id":121,userId:123,"title":"Lorem ipsum123", "description":"Tote bag twee butcher"},
            //    {"id":111,userId:234,"title":"Lorem ipsum234", "description":"Tote bag twee butcher"},
            //    {"id":1121,userId:234,"title":"Lorem ipsum234", "description":"Tote bag twee butcher"},
            //    {"id":13344,userId:345,"title":"Lorem ipsum345", "description":"Tote bag twee butcher"},
            //    {"id":5656,userId:567,"title":"Lorem ipsum567", "description":"Tote bag twee butcher"},
            //    {"id":55656,userId:456,"title":"Lorem ipsum456", "description":"Tote bag twee butcher"}
            //];
            //
            //
            var service={
                findPostById:findPostById,
                findAllPostsByUser:findAllPostsByUser,
                createPostForUser:createPostForUser,
                deletePostById:deletePostById,
                updatePostById:updatePostById
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




        }
})();

