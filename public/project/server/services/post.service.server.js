module.exports=function(app, userModel, postModel){

    app.get("/api/project/user/:userId/posts",getPosts);
    app.get("/api/project/post/:postId",getPost);
    // app.get("/api/project/short",);
    app.post("/api/project/user/:userId/post",addPost);
    app.delete("/api/project/post/:postId",deletePost);
    app.put("/api/project/post/:postId",updatePost);


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
        postModel.createPostForUser(req.params.userId, post).then(
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


};