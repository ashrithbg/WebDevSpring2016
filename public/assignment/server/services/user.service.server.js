module.exports=function(app,userModel){
    //app.post('/api/assignment/login',login);
    app.post('/api/assignment/user',createUser);
    app.get('/api/assignment/user',getUserByUsername);
    //app.get('/api/assignment/user',getUserByCredentials);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);
    app.get('/api/assignment/user',getAllUsers);
    app.get('/api/assignment/user/:id',getUserById);

    app.post("/api/assignment/user/login", getUserByCredentials);

    app.put('/api/assignment/user/:id',updateUser);
    app.delete('/api/assignment/user/:id',deleteUser);


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
        userModel.updateUser(req.body).then(
            function(doc) {
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
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
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
        res.json(req.session.currentUser);
    }




};