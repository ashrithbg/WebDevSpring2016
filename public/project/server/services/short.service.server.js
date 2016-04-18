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
    app.get("/api/project/short/:shortId/reviews",getReviewsByShort);
    app.get("/api/project/review/:reviewId",findReview);


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
        shortModel.findShortById(short).then(function(short){
            res.json(short);
        }, function(err){
            res.status(400).send(err);
        });

    }

    function addShort(req, res){
        var short = req.body;
        shortModel.addShortForUser(req.params.userId,short).then(function(shorts){
            res.json(shorts);
        },function(err){
            res.status(400).send(err);
        });

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

        var userId = req.params.userId;
        var short_review = req.body;
        var review = short_review.review;
        var short = short_review.short;
        var username = short_review.username;



        //shortModel
        //    .userReviewsShort(short, review)
        //    // add user to movie likes
        //    .then(
        //        function (short) {
        //
        //            return reviewModel.createReviewForUser(userId, short,review)
        //
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    ).then(function(reviews){
        //        res.json(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //    }
        //);
            // add movie to user likes
        console.log("in short service user id"+ userId);
        console.log("Short",JSON.stringify(short));
        console.log("Review",JSON.stringify(review));
        reviewModel.createReviewForUser(userId, username, short,review)
            .then(function(review){
                return shortModel.addShortReview(short,review);
            },function(err){
                res.status(400).send(err);
            })
            .then(function(reviews){
                 return reviewModel.findReviewsByIds(reviews)
            },function(err){
                res.status(400).send(err);
            })
            .then(function(reviews){
                res.json(reviews);
            },function(err){
                res.status(400).send(err);
            });



    }

    function userDeletesReview(req,res){

        var reviewId = req.params.reviewId;
        var shortId = req.params.shortId;
        //shortModel
        //    .userDeletesReview(short, review)
        //    // add user to movie likes
        //    .then(
        //        function (short) {
        //            return reviewModel.deleteReviewById(review._id);
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    ).then(function(reviews){
        //        res.json(reviews);
        //    },function(err){
        //        res.status(400).send(err);
        //    }
        //);

        reviewModel.deleteReviewById(reviewId).then(
            function(reviews){
                return shortModel.deleteShortReview(shortId,reviewId);
            },function(err){
                res.status(400).send(err);
            }).then(function(reviews){
                return reviewModel.findReviewsByIds(reviews)
            },function(err){
                res.status(400).send(err);
            }).then(function(reviews){
                res.json(reviews);
            },function(err){
                res.status(400).send(err);
        });


    }

    function userUpdatesReview(req,res){

        var review = req.body;
        var reviewId = req.params.reviewId;
        var shortId = req.params.shortId;

        reviewModel.updateReviewById(reviewId, review).then(function(reviews){
                return shortModel.findReviewsForShort(shortId);
            },function(err){
                res.status(400).send(err);
            }
        ).then(function(reviews){
            return reviewModel.findReviewsByIds(reviews)
        },function(err){
            res.status(400).send(err);
        }).then(function(reviews){
            res.json(reviews);
        },function(err){
            res.status(400).send(err);
        });



    }

    function getReviewsByUser(req,res){
        var user = req.params.userId;
        reviewModel.findAllReviewsByUser(user).then(
            function(reviews){
                res.json(reviews);
            },function(err){
                res.status(400).send(err);
            });

    }
    function getReviewsByShort(req,res){
        var short = req.params.shortId;
        reviewModel.findAllReviewsForShort(short).then(
            function(reviews){
                res.json(reviews);
            },function(err){
                res.status(400).send(err);
            });

    }

    function findReview(req,res){
        var review = req.params.reviewId;
        reviewModel.findReviewById(review).then(
            function(review){
                res.json(review);
            },function(err){
                res.status(400).send(err);
            });

    }

};