module.exports=function(app){
    var service = {
        findAllUsers : findAllUsers,
        findUserById : findUserById,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername : findUserByUsername,
        createUser:createUser,
        deleteUserById:deleteUserById,
        updateUser:updateUser,
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser,
        logged_in:logged_in,

    };
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:id',findUserById);
    app.get('/api/user/:username',findUserByUsername);
    app.post('/api/user/create',createUser);
    app.put('/api/user/update',updateUser);
    app.delete('/api/user/:id',deleteUserById);

    function findAllUsers(){

    }

    function findUserById(){

    }
    function findUserByUsername(){

    }

    function createUser(){

    }
    function updateUser() {

    }

    function deleteUserById(){

    }





};