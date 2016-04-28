var q = require("q");

module.exports=function(db,mongoose){

    var PostSchema = require("./post.schema.server.js")(mongoose);
    var PostModel = mongoose.model('Post', PostSchema);

    var api={
        findPostById:findPostById,
        findAllPostsByUser:findAllPostsByUser,
        createPostForUser:createPostForUser,
        deletePostById:deletePostById,
        updatePostById:updatePostById,
        findPostsByUsernames:findPostsByUsernames,
        findCommentsByPost:findCommentsByPost,
        createComment:createComment,
        deleteCommentById:deleteCommentById,
        findCommentsByUser:findCommentsByUser,
        findCommentsByUsername:findCommentsByUsername,
        userFavoritedPostById:userFavoritedPostById,
        userUnFavoritedPostById:userUnFavoritedPostById,
        findPostsByIds:findPostsByIds
    };

    return api;

    function findAllPostsByUser(userId) {
        var deferred = q.defer();
        console.log("user id ",userId);
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

    function createPostForUser(userId,username,post){
        var newPost = {
            title: post.title,
            userId:userId,
            description:post.description,
            createdByUser:username
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
                found_post.createdByUser = found_post.createdByUser;
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

    function findPostsByUsernames(names){

        var deferred = q.defer();


        PostModel.find({"createdByUser": { $in: names}}, function (err, shorts) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(shorts);
            }
        });
        return deferred.promise;

    }

    function findCommentsByPost(postId){
        var deferred = q.defer();

        PostModel.find({"postId":postId}, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc.comments);
            }

        });
        // return a promise
        return deferred.promise;

    }


    function createComment(postId,comment){
        console.log("In create comment post.model.js",postId,comment);
        var newComment ={
            content:comment.content,
            userId:comment.userId,
            username:comment.username
        };

        var deferred = q.defer();
        PostModel.findById(postId).then(
            function(post){
                post.comments.push(newComment);
                post.save(function(err,post){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(post.comments);
                    }
                });
            });
        return deferred.promise;



    }


    function deleteCommentById(postId,commentId){

        var deferred = q.defer();
        PostModel.findById(postId).then(
            function(post){
                post.comments.id(commentId).remove();
                post.save(function(err,post){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(post.comments);
                    }
                });
            });
        return deferred.promise;



    }

    function findCommentsByUser(userId) {

        var deferred = q.defer();

        PostModel.find({"comments.userId": userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function findCommentsByUsername(username) {

        var deferred = q.defer();

        PostModel.find({"comments.username": username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function userFavoritedPostById(postId,username){
        var deferred = q.defer();

        PostModel.findById(postId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    if(doc) {
                        doc.likes.push(username);
                        doc.save(function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });
                    }

                }

            });
        return deferred.promise;
    }

    function userUnFavoritedPostById(postId, username){

        var deferred = q.defer();

        PostModel.findById(postId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                if(doc) {
                    doc.likes.splice(doc.likes.indexOf(username),1);
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }

            }

        });
        return deferred.promise;


    }

    function findPostsByIds(postIds){
        var deferred = q.defer();

        // find all users in array of user IDs
        PostModel.find({
            _id: {$in: postIds}
        }, function (err, posts) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(posts);
            }
        });

        return deferred.promise;
    }

};