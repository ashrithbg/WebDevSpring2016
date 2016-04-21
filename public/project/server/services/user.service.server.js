var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports=function(app,userModel,postModel, shortModel){
    var auth = authorized;

    app.post('/api/project/user/register',register);
    app.get('/api/project/user',getUserByUsername);
    app.get("/api/project/user/loggedin", loggedin);
    app.post("/api/project/user/logout", logout);
    app.get('/api/project/users', auth, getAllUsers);
    app.get('/api/project/user/:id',getUserById);
    app.post("/api/project/user/login", passport.authenticate('project'),login);
    app.put('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/user/:id', auth, deleteUser);
    app.get("/api/project/user/:id/followers",findFollowers);
    app.get("/api/project/user/:id/following",findFollowing);
    app.post("/api/project/user/:id/follow",followUser);
    app.post("/api/project/user/:id/unfollow",unfollowUser);
    app.get("/api/project/user/:id/shorts/likes",findShortLikes);
    app.get("/api/project/user/:id/feed/shorts",getFollowingShorts);
    app.get("/api/project/user/:id/feed/posts",getFollowingPosts);

    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function createUser(req,res){
        var newUser = req.body;
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

    }


    function getUserById(req,res){
        userModel.findUserById(req.params.id).then(
            function(doc){
                res.json(doc);
            },function(err){
                res.status(400).send(err);
            });
    }

    function getUserByUsername(req,res){
        userModel.findUserByUsername(req.query.username).then(
            function(doc){
                console.log(JSON.stringify(doc));
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }



    function updateUser(req,res){
        var newUser = req.body;
        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req,res){
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


    function projectLocalStrategy(username, password,done) {

        userModel
            .findUserByCredentials({'username':username,'password':password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
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

        req.logOut();
        res.send(200);
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
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


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function followUser(req,res){
        var following = req.body;
        var followerId = req.params.id;


        userModel.addToFollowing(followerId,following.username).then(function(following){
            return userModel.findUserById(followerId);
        },function(err){
            res.status(400).send(err);
        }).then(function(user){
            return userModel.addToFollowers(following._id,user.username);
        },function(err){
            res.status(400).send(err);
        }).then(function(followers){
            res.json(followers);
        },function(err){
            res.status(400).send(err);
        });


    }

    function unfollowUser(req,res){
        var following = req.body;
        var followerId = req.params.id;

        userModel.removeFromFollowing(followerId,following.username)
            .then(function(following){
                return userModel.findUserById(followerId);
            },function(err){
                res.status(400).send(err);
            }).then(function(user){
                return userModel.removeFromFollowers(following._id,user.username);
            },function(err){
                res.status(400).send(err);
            }).then(function(followers){
                res.json(followers);
            },function(err){
                res.status(400).send(err);
            });

    }


    function findFollowers(req,res){
        var user = req.params.id;
        userModel.findFollowersById(user).then(function(doc){
            res.json(doc);
        },function(err) {
            res.status(400).send(err);
        });
    }


    function findFollowing(req,res){
        var user = req.params.id;
        userModel.findFollowingById(user).then(function(doc){
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function findShortLikes(req,res){

        var userId = req.params.id;

        userModel.findShortsLikedByUser(userId).then(function(shortLikes){
            res.json(shortLikes);
        },function(err){
            res.status(400).send(err);
        });

    }


    function findPostLikes(req,res){
        var userId = req.params.id;
        var postsLikedByUser =[];
        userModel.findPostsLikedByUser(userId).then(function(postLikes){
            postLikes.forEach(function(entry){
                postModel.findShortById(entry).then(
                    function(post){
                        postsLikedByUser.push(post);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );

            });
            res.json(postsLikedByUser);
        },function(err){
            res.status(400).send(err);
        })

    }


    function getFollowingShorts(req,res){
        var user = req.params.id;
        userModel.findFollowingById(user).then(function(following){
            return shortModel.findShortsByUsernames(following);
        },function(err){
            res.status(400).send(err);
        }).then(function(shorts){
            res.json(shorts);
        },function(err){
            res.status(400).send(err);
        });

    }

    function getFollowingPosts(req,res){
        var user = req.params.id;

        userModel.findFollowingById(user).then(function(following){
            return postModel.findPostsByUsernames(following);
        },function(err){
            res.status(400).send(err);
        }).then(function(posts){
            res.json(posts);
        },function(err){
            res.status(400).send(err);
        });
    }

};