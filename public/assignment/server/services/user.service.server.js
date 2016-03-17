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
        return userModel.findAllUsers();

    }

    function getAllUsers(req,res){

    }

    function getUserById(req,res){

    }

    function getUserByUsername(req,res){

    }

    function getUserByCredentials(req,res){

    }

    function updateUser(req,res){

    }

    function deleteUser(req,res){


    }



}