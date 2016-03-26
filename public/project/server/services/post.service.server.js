module.exports=function(app, userModel, postModel){

    app.get("/api/project/user/:userId/posts",getPosts);
    app.get("/api/project/post/:postId",getPost);
    // app.get("/api/project/short",);
    app.post("/api/project/user/:userId/post",addPost);
    app.delete("/api/project/post/:postId",deletePost);
    app.put("/api/project/post/:postId",updatePost);


    function getPosts(req, res){
        var user = req.params.userId;
        res.json(postModel.findAllPostsByUser(user));

    }

    function getPost(req, res){
        res.json(postModel.findPostById(req.params.postId));

    }

    function addPost(req, res){

        var post = req.body;
        res.json(postModel.createPostForUser(req.params.userId, post));

    }
    function deletePost(req, res){
        res.json(postModel.deletePostById(req.params.postId));

    }

    function updatePost(req, res){
        res.json(postModel.updatePostById(req.params.postId, req.body));

    }


}