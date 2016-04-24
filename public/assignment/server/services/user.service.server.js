
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports=function(app,userModel){
    var auth = authorized;
    var isAdmin = isAdmin;

    app.get('/api/assignment/admin/user', isAdmin, getAllUsers);

    app.post('/api/assignment/user/register',register);
    app.get('/api/assignment/user',getUserByUsername);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.post("/api/assignment/user/logout", logout);

    app.get('/api/assignment/admin/user/:id',isAdmin, getUserById);
    app.post("/api/assignment/user/login", passport.authenticate('local'),login);
    app.put('/api/assignment/user/:id',auth, updateUser);
    app.put('/api/assignment/admin/user/:id', isAdmin, adminupdateUser);
    app.delete('/api/assignment/admin/user/:id', isAdmin, deleteUser);
    app.post  ('/api/assignment/admin/user', isAdmin, createUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


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
        console.log("in get all users");

            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        console.log(JSON.stringify(users));
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );

    }

    function getUserById(req,res){
        // res.json(userModel.findUserById(req.params.id));

            userModel.findUserById(req.params.id).then(
                function (doc) {
                    res.json(doc);
                }, function (err) {
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

    function updateUser(req,res,next){
        //res.json(userModel.updateUser(req.body));
        var newUser = req.body;
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findUserById(req.params.id);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    //res.json(users)
                    console.log(JSON.stringify(user));

                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }


                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function adminupdateUser(req,res){

        var newUser = req.body;
        //if(!isAdmin(req,res,next)) {
        //    delete newUser.roles;
        //}
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        newUser.password = bcrypt.hashSync(newUser.password);

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
                    console.log("users after update",JSON.stringify(users));
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


    function localStrategy(username, password,done) {

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        //req.session.destroy();
        req.logOut();
        res.send(200);
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }




    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }


    function isAdmin(req, res, next) {
        if(req.user.roles.indexOf("admin") > -1 && req.isAuthenticated() ) {
            next();
        }else{
            res.status(403).send("Authentication failed!");
        }
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

};