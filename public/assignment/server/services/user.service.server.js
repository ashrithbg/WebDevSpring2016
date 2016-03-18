module.exports=function(app,userModel){

    app.post('api/assignment/user',createUser);
    app.get('/api/assignment/user',getAllUsers);
    app.get('/api/assignment/user/:id',getUserById);
    app.get('/api/assignment/user?username=username',getUserByUsername);
    app.get('/api/assignment/user?username=alice&password=wonderland',getUserByCredentials);
    app.put('/api/assignment/user/:id',updateUser);
    app.delete('/api/assignment/user/:id',deleteUser);

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
        res.json(userModel.findUserByCredentials(req.params.username,req.params.password));

    }

    function updateUser(req,res){
        res.json(userModel.updateUser(req.body));
    }

    function deleteUser(req,res){
        res.json(userModel.deleteUser(req.params.id));s

    }



}