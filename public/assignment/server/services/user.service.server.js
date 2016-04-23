
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

module.exports=function(app,userModel){
    var auth = authorized;

    //passport.use('assignment',new LocalStrategy(assignmentlocalStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

   // app.post('/api/assignment/user/register',register);
    app.get('/api/assignment/user',getUserByUsername);
   // app.get("/api/assignment/user/loggedin", loggedin);
    //app.post("/api/assignment/user/logout", logout);
    app.get('/api/assignment/users', auth, getAllUsers);
    app.get('/api/assignment/user/:id',getUserById);
   // app.post("/api/assignment/user/login", passport.authenticate('assignment'),login);
    app.put('/api/assignment/user/:id', auth, updateUser);
    app.delete('/api/assignment/user/:id', auth, deleteUser);
    app.post  ('/api/assignment/user', auth, createUser);






    function createUser(req,res){
        //var user = req.body;
        //userModel.createUser(user).then(
        //    function(doc){
        //        req.session.currentUser = doc;
        //        res.json(doc);
        //    }, function(err){
        //        res.status(400).send(err);
        //    });

        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }
        console.log("In create user user service server",JSON.stringify(newUser));
        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )

    }

    function getAllUsers(req,res){

        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }

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
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
        //res.json(userModel.deleteUser(req.params.id));
        userModel.deleteUserById(req.params.id).then(
            function(docs){
               return userModel.findAllUsers();
            }, function(err){
                res.status(400).send(err);
            }

        ).then(
            function(users){
                res.json(users);
            },
            function(err){
                res.status(400).send(err);
            }
        );

    }


    //function assignmentlocalStrategy(username, password,done) {
    //
    //    //userModel.findUserByCredentials(credentials)
    //    //    .then(
    //    //        function (doc) {
    //    //            console.log("document",doc);
    //    //            req.session.currentUser = doc;
    //    //            console.log("login"+JSON.stringify(req.session.currentUser));
    //    //            console.log("In login function",req.session.currentUser);
    //    //            res.json(doc);
    //    //        },
    //    //        // send error if promise rejected
    //    //        function ( err ) {
    //    //            res.status(400).send(err);
    //    //        }
    //    //    );
    //
    //    userModel
    //        .findUserByCredentials({'username':username,'password':password})
    //        .then(
    //            function(user) {
    //                if (!user) { return done(null, false); }
    //                return done(null, user);
    //            },
    //            function(err) {
    //                if (err) { return done(err); }
    //            }
    //        );
    //}
    //
    //function serializeUser(user, done) {
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done) {
    //    userModel
    //        .findUserById(user._id)
    //        .then(
    //            function(user){
    //                done(null, user);
    //            },
    //            function(err){
    //                done(err, null);
    //            }
    //        );
    //}

    //function login(req, res){
    //    var user = req.user;
    //    res.json(user);
    //}

    //function logout(req, res) {
    //    //req.session.destroy();
    //    req.logOut();
    //    res.send(200);
    //}
    //function loggedin(req, res) {
    //    //console.log("In logged in"+req.session.currentUser);
    //    //
    //    //res.json(req.session.currentUser);
    //    res.send(req.isAuthenticated() ? req.user : '0');
    //}
    //
    //
    //
    //
    //function register(req, res) {
    //    var newUser = req.body;
    //    newUser.roles = ['student'];
    //
    //    userModel
    //        .findUserByUsername(newUser.username)
    //        .then(
    //            function(user){
    //                if(user) {
    //                    res.json(null);
    //                } else {
    //                    return userModel.createUser(newUser);
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(user){
    //                if(user){
    //                    req.login(user, function(err) {
    //                        if(err) {
    //                            res.status(400).send(err);
    //                        } else {
    //                            res.json(user);
    //                        }
    //                    });
    //                }
    //            },
    //            function(err){
    //                console.log("Error",JSON.stringify(err));
    //                res.status(400).send(err);
    //            }
    //        );
    //}


    function isAdmin(user) {
        if(user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};