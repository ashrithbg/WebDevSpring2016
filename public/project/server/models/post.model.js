var posts = require("./post.mock.json");

module.exports=function(){

    var api={
        findPostById:findPostById,
        findAllPostsByUser:findAllPostsByUser,
        createPostForUser:createPostForUser,
        deletePostById:deletePostById,
        updatePostById:updatePostById
    };

    return api;

    function findAllPostsByUser(userId) {
        console.log("user id is "+userId);
        var userPosts=[];
        for(var p in posts) {
            if(posts[p].userId == userId){
                console.log("title "+posts[p].title+"id "+posts[p].userId);
                userPosts.push(posts[p]);
            }
        }
        console.log("all posts by user "+userPosts);
        return userPosts;
        //callback(users);
    }

    function deletePostById(postId){
        var post = findPostById(postId);
        console.log("post title to be deleted "+post.title);
        if(post!=null){
            posts.splice(posts.indexOf(post),1);
        }
        console.log(posts);
        return posts;

    }

    function createPostForUser(userId,post){
        var newPost = {
            id: (new Date).getTime(),
            title: post.title,
            description:post.description,
            userId:userId
        };
        posts.push(newPost);
        return newPost;

    }

    function updatePostById(postId,newPost){

        for(var p in posts){
            if (posts[p].id == postId){
                console.log("postId"+postId);
                var updatedPost = {
                    id:newPost.id,
                    title:newPost.title,
                    userId:newPost.userId,
                    description:newPost.description
                };
                posts[p] = updatedPost;
                return updatedPost;
            }
        }
    }

    function findPostById(postId){
        console.log("post id"+postId);
        for(var p in posts){
            if (posts[p].id == postId){
                console.log(posts[p]);
                return posts[p];
            }
        }
        return null;
    }


}