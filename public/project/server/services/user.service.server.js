module.exports=function(app,userModel,postModel, shortModel){

    app.post('/api/project/user',createUser);
    app.get('/api/project/user',getUserByUsername);
    //app.get('/api/assignment/user',getUserByCredentials);
    app.get("/api/project/user/loggedin", loggedin);
    app.post("/api/project/user/logout", logout);
    app.get('/api/project/user',getAllUsers);
    app.get('/api/project/user/:id',getUserById);
    app.post("/api/project/user/login", login);
    app.put('/api/project/user/:id',updateUser);
    app.delete('/api/project/user/:id',deleteUser);


    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user).then(
            function(doc){
                req.session.currentUser = doc;
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });

    }

    function getAllUsers(req,res){

        userModel.findAllUsers().then(
            function(docs){
                res.json(docs)
            },function(err){
                res.status(400).send(err);
            }
        );

    }

    function getUserById(req,res){
        // res.json(userModel.findUserById(req.params.id));
        userModel.findUserById(req.params.id).then(
            function(doc){
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            });
    }

    function getUserByUsername(req,res){

        //res.json(userModel.findUserByUsername(req.params.username));\
        console.log("In get user by name"+req.query.username);
        userModel.findUserByUsername(req.query.username).then(
            function(doc){
                console.log(JSON.stringify(doc));
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function getUserByCredentials(req,res){

        // res.json(userModel.findUserByCredentials(req.query.username,req.query.password));
        userModel.findUserByCredentials(req.query.username,req.query.password).then(
            function(doc){
                req.session.currentUser = doc;
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            }
        );

    }

    function updateUser(req,res){
        //res.json(userModel.updateUser(req.body));
        userModel.updateUser(req.params.id,req.body).then(
            function(doc) {
                req.session.currentUser = doc;
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            }
        );
    }

    function deleteUser(req,res){
        //res.json(userModel.deleteUser(req.params.id));
        userModel.deleteUser(req.params.id).then(
            function(docs){
                res.json(docs);
            }, function(err){
                res.status(400).send(err);
            }

        );

    }
    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    console.log("document",doc);
                    req.session.currentUser = doc;
                    console.log("login"+JSON.stringify(req.session.currentUser));
                    console.log("In login function",req.session.currentUser);
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }



    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
    function loggedin(req, res) {
        console.log("In logged in"+req.session.currentUser);
        res.json(req.session.currentUser);
    }

    //function findShortLikes(req,res){
    //
    //    var userId = req.params.id;
    //
    //    userModel.findShortsLikedByUser(userId).then(function(shortLikes){
    //        res.json(shortLikes);
    //    },function(err){
    //        res.status(400).send(err);
    //    });
    //
    //}
    //
    //
    //function findPostLikes(req,res){
    //    var userId = req.params.id;
    //    var postsLikedByUser =[];
    //    userModel.findPostsLikedByUser(userId).then(function(postLikes){
    //        postLikes.forEach(function(entry){
    //            postModel.findShortById(entry).then(
    //                function(post){
    //                    postsLikedByUser.push(post);
    //                },
    //                function(err){
    //                    res.status(400).send(err);
    //                }
    //            );
    //
    //        });
    //        res.json(postsLikedByUser);
    //    },function(err){
    //        res.status(400).send(err);
    //    })
    //
    //}

};