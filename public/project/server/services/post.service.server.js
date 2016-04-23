module.exports=function(app, userModel, postModel){

    app.get("/api/project/user/:userId/posts",getPosts);
    app.get("/api/project/post/:postId",getPost);
    app.post("/api/project/user/:userId/post",addPost);
    app.delete("/api/project/post/:postId",deletePost);
    app.put("/api/project/post/:postId",updatePost);
    app.post("/api/project/post/:postId/comment",createComment);
    app.delete("/api/project/post/:postId/comment/:commentId",deleteComment);
    app.get("/api/project/user/:username/comments",getCommentsByUsername);
    app.get("/api/project/user/:userId/comments",getCommentsByUser);
    app.post("/api/project/user/:username/post/:postId/favorite",userFavoritedPost);
    app.post("/api/project/user/:username/post/:postId/unfavorite",userUnFavoritedPost);


    function getPosts(req, res){
        var user = req.params.userId;
        postModel.findAllPostsByUser(user).then(
            function(posts){
                console.log("In post service",JSON.stringify(posts));
                res.json(posts);
            },function(err){
            res.status(400).send(err);
        });

    }

    function getPost(req, res){
        postModel.findPostById(req.params.postId).then(
            function(post){
                res.json(post);
            },function(err) {
                res.status(400).send(err);
            });

    }

    function addPost(req, res){

        var post = req.body;
        userModel.findUserById(req.params.userId).then(function(user){
            return postModel.createPostForUser(req.params.userId, user.username, post);
            },function(err){
                res.status(400).send(err);
            }).then(
                function(posts){
                    res.json(posts);
                },function(err){
                    res.status(400).send(err);
            });


    }
    function deletePost(req, res){
        postModel.deletePostById(req.params.postId).then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.status(400).send(err);
            });

    }

    function updatePost(req, res){
        postModel.updatePostById(req.params.postId, req.body).then(
            function(posts){
                res.json(posts);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }




    function deleteComment(req,res){
        postModel.deleteCommentById(req.params.postId,req.params.commentId).then(function(comments){
            res.json(comments);
        },function(err){
            res.status(400).send(err);
        });
    }

    function createComment(req,res){
        console.log("In create comment post.service.server.js");
        postModel.createComment(req.params.postId,req.body).then(function(comments){
            res.json(comments);
        },function(err){
            res.status(400).send(err);
        });
    }
    function getCommentsByUsername(req,res){
        postModel.findCommentsByUsername(req.params.username).then(function(comments){
            res.json(comments);
        }, function(err){
            res.status(400).send(err);
        });
    }

    function getCommentsByUser(req,res){
        postModel.findCommentsByUser(req.params.userId).then(function(comments){
            res.json(comments);
        }, function(err){
            res.status(400).send(err);
        });
    }

    function userFavoritedPost(req,res){
        postModel.userFavoritedPostById(req.params.postId, req.params.username)
            .then(function(response){
                return userModel.userFavoritedPost(req.params.postId,req.params.username)
            },function(err){
                res.status(400).send(err);
            }).then(function(likedPosts){
                res.json(likedPosts);
            },function(err){
                res.status(400).send(err);
        });
    }

    function userUnFavoritedPost(req,res){

        postModel.userUnFavoritedPostById(req.params.postId,req.params.username)
            .then(function(response){
                return userModel.userUnFavoritedPost(req.params.postId,req.params.username)
            },function(err){
                res.status(400).send(err);
            }).then(function(likedPosts){
            res.json(likedPosts);
        },function(err){
            res.status(400).send(err);
        });
    }

};