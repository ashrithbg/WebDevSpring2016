module.exports=function(app, userModel, shortModel, reviewModel){

    app.post("/api/project/user/:userId/short/review",userReviewsShort);
    app.get("/api/project/user/:userId/shorts",getShorts);
    app.get("/api/project/short/:shortId",getShort);
    app.post("/api/project/user/:userId/short",addShort);
    app.delete("/api/project/short/:shortId",deleteShort);
    app.put("/api/project/short/:shortId",updateShort);
    app.post("/api/project/user/:userId/short/:shortId", userLikesShort);
    app.post("/api/project/user/:userId/unlike/short/:shortId",userUnlikesShort);
    app.get("/api/project/short/:shortId/likes",findUserLikes);
    app.delete("/api/project/short/:shortId/review/:reviewId",userDeletesReview);
    app.put("/api/project/short/:shortId/review/:reviewId",userUpdatesReview);
    app.get("/api/project/user/:userId/reviews",getReviewsByUser);
    app.get("/api/project/user/:username/reviews",getReviewsByUsername);
    app.get("/api/project/short/:shortId/reviews",getReviewsByShort);
    app.get("/api/project/review/:reviewId",findReview);
    app.post("/api/project/shorts/reviews",getShortsByIds);

    function getShorts(req, res){
        var user = req.params.userId;
        shortModel.findShortsForUser(user).then(
            function(shorts){
                res.json(shorts);
            },function(err){
                res.status(400).send(err);
            });

    }

    function getShort(req, res){
        var short = req.params.shortId;
        shortModel.findShortByYtID(short).then(function(short){
            res.json(short);
        }, function(err){
            res.status(400).send(err);
        });

    }

    function addShort(req, res){
        var short = req.body;
        userModel.findUserById(req.params.userId).then(function(user){
            return shortModel.addShortForUser(req.params.userId,user.username,short);
        },function(err){
            res.status(400).send(err);
        }).then(function(shorts){
            return shortModel.findShortsForUser(req.params.userId);
        },function(err){
            res.status(400).send(err);
        }).then(function(shorts){
            res.json(shorts);
        },function(err){
            res.status(400).send(err);
        });
        //shortModel.addShortForUser(req.params.userId,short).then(function(shorts){
        //    console.log("In add short for user",console.log(shorts));
        //    return shortModel.findShortsForUser(req.params.userId);
        //},function(err){
        //    res.status(400).send(err);
        //}).then(function(shorts){
        //    res.json(shorts);
        //},function(err){
        //    res.status(400).send(err);
        //});

    }

    function userLikesShort(req, res){
        var shortYoutube = req.body;
        var userId = req.params.userId;
        var shortID = req.params.shortId;
        var short;

        shortModel
            .userLikesShort(userId, shortYoutube)
            // add user to movie likes
            .then(
                function (short) {
                    return userModel.userLikesShort(userId, short);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function userUnlikesShort(req, res){
        var shortYoutube = req.body;
        var userId = req.params.userId;
        var shortID = req.params.shortId;
        var short;

        console.log("SHORT TO BE UNLIKED", shortID);

        shortModel
            .userUnlikesShort(userId, shortYoutube)
            // add user to movie likes
            .then(
                function (short) {
                    return userModel.userUnlikesShort(userId, short);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add movie to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function updateShort(req, res){
        var short = req.body;
        console.log("in update short",JSON.stringify(short));
        shortModel.updateShortById(req.params.shortId,short).then(function(short){
            res.json(short);
        },function(err){
            res.status(400).send(err);
        });
    }

    function deleteShort(req, res){
       shortModel.deleteShortById(req.params.shortId).then(function(shorts){
           res.json(shorts);
       },function(err){
           res.status(400).send(err);
       });
    }

    function findUserLikes (req, res) {
        var shortId = req.params.shortId;

        var short = null;
        shortModel
            .findShortByYtID(shortId)
            .then (
                function (doc) {
                    short = doc;
                    if (doc) {
                        return userModel.findUsersByIds(short.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    console.log("users in short service",JSON.stringify(users));
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function userReviewsShort(req,res){

        var short_review = req.body;
        var review = short_review.review;
        var short = short_review.short;

        //reviewModel.createReviewForUser(userId, username, short,review)
        //    .then(function(review){
        //        return shortModel.addShortReview(short,review);
        //    },function(err){
        //        res.status(400).send(err);
        //    })
        //    .then(function(reviews){
        //         return reviewModel.findReviewsByIds(reviews)
        //    },function(err){
        //        res.status(400).send(err);
        //    })
        //    .then(function(reviews){
        //        res.json(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //    });

        shortModel.createReview(short,review).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });


    }

    function userDeletesReview(req,res){

        var reviewId = req.params.reviewId;
        var shortId = req.params.shortId;
        //reviewModel.deleteReviewById(reviewId).then(
        //    function(reviews){
        //        return shortModel.deleteShortReview(shortId,reviewId);
        //    },function(err){
        //        res.status(400).send(err);
        //    }).then(function(reviews){
        //        return reviewModel.findReviewsByIds(reviews)
        //    },function(err){
        //        res.status(400).send(err);
        //    }).then(function(reviews){
        //        res.json(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //});
        shortModel.deleteReviewById(shortId,reviewId).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });

    }

    function userUpdatesReview(req,res){

        var review = req.body;
        var reviewId = req.params.reviewId;
        var shortId = req.params.shortId;

        //reviewModel.updateReviewById(reviewId, review).then(function(reviews){
        //        return shortModel.findReviewsForShort(shortId);
        //    },function(err){
        //        res.status(400).send(err);
        //    }
        //).then(function(reviews){
        //    return reviewModel.findReviewsByIds(reviews)
        //},function(err){
        //    res.status(400).send(err);
        //}).then(function(reviews){
        //    res.json(reviews);
        //},function(err){
        //    res.status(400).send(err);
        //});

        shortModel.updateReviewById(shortId,reviewId,review).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });




    }

    function getReviewsByUser(req,res){
        //var user = req.params.userId;
        //reviewModel.findAllReviewsByUser(user).then(
        //    function(reviews){
        //        return reviewModel.findReviewsByIds(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //    }).then(function(reviews){
        //        res.json(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //});
        var userId = req.params.userId;
        shortModel.findReviewsByUser(userId).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });




    }
    function getReviewsByShort(req,res){
        //var short = req.params.shortId;
        //reviewModel.findAllReviewsForShort(short).then(
        //    function(reviews){
        //        res.json(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //    });

        var shortId = req.params.shortId;
        shortModel.findReviewsForShort(shortId).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });

    }

    function findReview(req,res){
        var review = req.params.reviewId;

        shortModel.findReviewById(reviewId).then(function(review){
            res.json(review);
        },
        function(err){
            res.status(400).send(err);
        });


    }

    function getShortsByIds(req,res){
        var ids = req.body;
        shortModel.findShortByIds(ids).then(
            function(shorts){
                res.json(shorts);
            },
            function(err){
                res.status(400).send(err);
            }
        )

    }

    function getReviewsByUsername(req, res){

        shortModel.findReviewsByUsername(req.params.username).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });

    }

};