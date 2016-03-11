(function()
{
    angular
        .module("ShortKutApp")
        .factory("PostService", PostService);

        function PostService(){

            var posts=[
                {"id":121,userId:123,"title":"Lorem ipsum", "description":"Tote bag twee butcher"},
                {"id":111,userId:123,"title":"Lorem ipsum", "description":"Tote bag twee butcher"},
                {"id":12212,userId:123,"title":"Lorem ipsum", "description":"Tote bag twee butcher"}
            ];

            var service={
                findPostById:findPostById,
                findAllPostsByUser:findAllPostsByUser,
                createPostForUser:createPostForUser,
                deletePostById:deletePostById,
                updatePostById:updatePostById
            };

            return service;

            function findAllPostsByUser(userId,callback) {
                console.log("user id is "+userId);
                var userPosts=[];
                for(var p in posts) {
                    if(posts[p].userId == userId){
                        console.log("title "+posts[p].title+"id "+posts[p].userId);
                        userPosts.push(posts[p]);
                    }
                }
                console.log("all posts by user "+userPosts);
                callback(userPosts);
                //callback(users);
            }
            function deletePostById(postId,callback){
                var post = findPostById(postId);
                console.log("post title to be deleted "+post.title);
                if(post!=null){
                    posts.splice(posts.indexOf(post),1);
                }
                console.log(posts);
                callback(posts);

            }
            function createPostForUser(userId,post,callback){
                var newPost = {
                    id: (new Date).getTime(),
                    title: post.title,
                    description:post.description,
                    userId:userId
                };
                posts.push(newPost);
                callback(newPost);

            }
            function updatePostById(postId,newPost,callback){

                for(var p in posts){
                    if (posts[p].id === postId){
                        console.log("postId"+postId);
                        var updatedPost = {
                            id:newPost.id,
                            title:newPost.title,
                            userId:newPost.userId,
                            description:newPost.description
                        };
                        posts[p] = updatedPost;
                        callback(updatedPost);
                    }
                }


            }

            function findPostById(postId,callback){
                console.log("post id"+postId);
                for(var p in posts){
                    if (posts[p].id == postId){
                        console.log(posts[p]);
                        callback(posts[p]);
                    }
                }
                callback(null);
            }


        }
})();

