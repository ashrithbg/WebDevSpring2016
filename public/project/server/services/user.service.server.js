module.exports=function(app,userModel){
    app.post('api/project/user',createUser);
    app.get('/api/project/user',getUserByCredentials);
    app.get('/api/project/user',getAllUsers);
    app.get('/api/project/user/:id',getUserById);
    app.get('/api/project/user?username=username',getUserByUsername);

    app.put('/api/project/user/:id',updateUser);
    app.delete('/api/project/user/:id',deleteUser);


    function createUser(req,res){
        var user = req.body;
        userModel.createUser(user);
        res.json(userModel.findAllUsers());

    }

    function getAllUsers(req,res){
        res.json(userModel.findAllUsers());

    }

    function getUserById(req,res){
        res.json(userModel.findUserById(req.params.id));
    }

    function getUserByUsername(req,res){

        res.json(userModel.findUserByUsername(req.params.username));
    }

    function getUserByCredentials(req,res){
        console.log(req.query);
        res.json(userModel.findUserByCredentials(req.query.username,req.query.password));

    }

    function updateUser(req,res){
        res.json(userModel.updateUser(req.body));
    }

    function deleteUser(req,res){
        res.json(userModel.deleteUser(req.params.id));s

    }
    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            )
    }



    function logout(req, res) {
        //req.session.destroy();
        res.send(200);
    }


}