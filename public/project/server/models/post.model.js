var q = require("q");

module.exports=function(db,mongoose){

    var PostSchema = require("./post.schema.server.js")(mongoose);

    // create user model from schema
    var PostModel = mongoose.model('Post', PostSchema);

    var api={
        findPostById:findPostById,
        findAllPostsByUser:findAllPostsByUser,
        createPostForUser:createPostForUser,
        deletePostById:deletePostById,
        updatePostById:updatePostById
    };

    return api;

    function findAllPostsByUser(userId) {
        //console.log("user id is "+userId);
        //var userPosts=[];
        //for(var p in posts) {
        //    if(posts[p].userId == userId){
        //        console.log("title "+posts[p].title+"id "+posts[p].userId);
        //        userPosts.push(posts[p]);
        //    }
        //}
        //console.log("all posts by user "+userPosts);
        //return userPosts;
        ////callback(users);


        var deferred = q.defer();

        PostModel.find({"userId":userId},function(err,posts){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log("Posts"+JSON.stringify(posts));
                deferred.resolve(posts);

            }
        });
        return deferred.promise;
    }

    function deletePostById(postId){
        //var post = findPostById(postId);
        //console.log("post title to be deleted "+post.title);
        //if(post!=null){
        //    posts.splice(posts.indexOf(post),1);
        //}
        //console.log(posts);
        //return posts;

        var deferred = q.defer();
        PostModel.remove({"_id":postId}, function(err,posts){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(posts);
            }
        });

        return deferred.promise;

    }

    function createPostForUser(userId,post){
        //var newPost = {
        //    id: (new Date).getTime(),
        //    title: post.title,
        //    description:post.description,
        //    userId:userId
        //};
        //posts.push(newPost);
        //return newPost;
        var newPost = {
            title: post.title,
            userId:userId,
            description:post.description
        };
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        PostModel.create(newPost, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                var docs="";
                if(doc){
                    docs=findAllPostsByUser(userId);
                }
                deferred.resolve(docs);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function updatePostById(postId,newPost){

        //for(var p in posts){
        //    if (posts[p].id == postId){
        //        console.log("postId"+postId);
        //        var updatedPost = {
        //            id:newPost.id,
        //            title:newPost.title,
        //            userId:newPost.userId,
        //            description:newPost.description
        //        };
        //        posts[p] = updatedPost;
        //        return updatedPost;
        //    }
        //}
        console.log("formId :"+postId);
        var deferred = q.defer();

        PostModel.findById({"_id":postId},function(err,found_post){
            if(err){
                deferred.reject(err);
            }
            else {
                found_post.title = newPost.title;
                found_post.userId = newPost.userId;
                found_post.comments = newPost.comments;
                found_post.likes = newPost.likes;
                found_post.save(function (err, updated_post) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updated_post);
                    }

                });


            }});
            return deferred.promise;
        }



    function findPostById(postId){
        //console.log("post id"+postId);
        //for(var p in posts){
        //    if (posts[p].id == postId){
        //        console.log(posts[p]);
        //        return posts[p];
        //    }
        //}
        //return null;
        var deferred = q.defer();
        PostModel.findById(postId,
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;

    }


};