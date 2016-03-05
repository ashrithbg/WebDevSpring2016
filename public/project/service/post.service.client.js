(function()
{
    angular
        .module("ShortKutApp")
        .factory("PostService", PostService);

        function PostService(){

            var posts=[
                {"id":121,userId:111,"title":"Lorem ipsum", "description":"Tote bag twee butcher"},
                {"id":111,userId:111,"title":"Lorem ipsum", "description":"Tote bag twee butcher"},
                {"id":12212,userId:1234,"title":"Lorem ipsum", "description":"Tote bag twee butcher"}
            ]

            var service={
                findPostById:findPostById,
                findAllPostsByUser:findAllPostsbyUser,
                createPostForUser:createPostForUser,
                findPostById:findPostById,
                deletePostById:deletePostById,
                updatePostById:updatePostById
            };

            return service;

            function findAllPostsbyUser(userId,callback) {
                var userPosts=[];
                for(var p in posts) {
                    if(posts[p].userId === userId){
                        console.log(posts[p].title);
                        userPosts.push(posts[p]);
                    }
                }
                callback(userPosts);
                //callback(users);
            }
            function deletePostById(postId,callback){
                var form = findPostById(postId);
                console.log(post.title);
                if(post!=null){
                    posts.splice(posts.indexOf(form),1);
                }
                callback(posts);

            }
            function createPostForUser(userId,post,callback){
                var newPost = {
                    _id: (new Date).getTime(),
                    title: post.title,
                    description:post.description,
                    userId:userId
                };
                posts.push(newPost);
                callback(newPost);

            }
            function updatePostById(postId,newPost,callback){

                for(var p in posts){
                    if (posts[p]._id == postId){
                        var updatedPost = {
                            _id:newPost._id,
                            title:newPost.title,
                            userId:newPost.userId
                        };
                        posts[p] = updatedPost;
                        callback(updatedPost);
                    }
                }


            }

            function findPostById(postId){
                console.log("form id"+postId);
                for(var p in posts){
                    if (posts[p]._id === postId){
                        console.log(posts[p]);
                        return posts[p];
                    }
                }
                return null;
            }


        }
})();

