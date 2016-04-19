var q = require("q");
module.exports=function(db, mongoose) {

    var ShortSchema = require("./short.schema.server.js")(mongoose);

    // create user model from schema
    var ShortModel = mongoose.model('Short', ShortSchema);

    var api = {

        addShortForUser: addShortForUser,
        deleteShortById: deleteShortById,
        updateShortById: updateShortById,
        findShortsForUser:findShortsForUser,
        findShortById:findShortById,
        findUserLikes:findUserLikes,
        findReviewsForShort: findReviewsForShort,
        findCommentsForShort: findCommentsForShort,
        userLikesShort:userLikesShort,
        userUnlikesShort:userUnlikesShort,
        addShortReview:addShortReview,
        findShortByYtID:findShortByYtID,
        deleteShortReview:deleteShortReview,
        //updateShortReview:updateShortReview

        //updateReview:updateReview,
        //updateComment:updateComment


    };
    return api;

    function addShortForUser(userId, newShort) {

        var newShort = {
            title: newShort.title,
            userId: userId,
            language: newShort.language,
            url: newShort.url,
            description: newShort.description
        };
        var deferred = q.defer();
        ShortModel.create(newShort, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                var docs="";
                if(doc){
                    docs=findShortsForUser(userId);
                }
                deferred.resolve(docs);
            }

        });

        return deferred.promise;

    }

    function deleteShortById(shortId) {
        //var shortToDelete = findShortById(shortId);
        //console.log(shortToDelete.id);
        //if (shortToDelete != null) {
        //    shorts.splice(shorts.indexOf(shortToDelete), 1);
        //}
        //return shorts;
        var deferred = q.defer();
        ShortModel.remove({"_id":shortId}, function(err,posts){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(posts);
            }
        });

        return deferred.promise;

    }

    function updateShortById(shortId, newShort) {
        //console.log("id is" + newShort.id + "  title is" + newShort.title);
        //for (var s in shorts) {
        //    if (shorts[s].id == shortId) {
        //        console.log("id is " + shorts[s].id);
        //        var updatedShort = {
        //            id: shortId,
        //            title: newShort.title,
        //            userId: newShort.userId,
        //            language: newShort.language,
        //            url: newShort.url,
        //            description: newShort.description
        //        };
        //        shorts[s] = updatedShort;
        //        return short[s];
        //    }
        //}

        var deferred = q.defer();

        ShortModel.findById({"_id":shortId},function(err,found_short){
            if(err){
                deferred.reject(err);
            }
            else {
                found_short.title = newShort.title;
                found_short.userId = newShort.userId;
                found_short.description = found_short.description;
                found_short.url = found_short.url;
                found_short.language = found_short.language;
                found_short.comments = newShort.comments;
                found_short.likes = newShort.likes;
                found_short.save(function (err, updated_short) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updated_short);
                    }

                });


            }});
        return deferred.promise;

    }

    function findShortById(shortId) {
        //console.log("form id" + shortId);
        //for (var s in shorts) {
        //    console.log("id " + shorts[s].id);
        //    console.log("title " + shorts[s].title);
        //    if (shorts[s].id == shortId) {
        //        console.log(shorts[s].title);
        //        console.log("Found a short" + shorts[s].id);
        //        return shorts[s];
        //    }
        //}
        //return null;
        var deferred = q.defer();
        ShortModel.findById(shortId,
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }
    function findShortByYtID(shortId){
        var deferred = q.defer();
        ShortModel.findOne({ytID:shortId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;

    }
    function findShortsForUser(userId) {
        //var userShorts = [];
        //console.log("In find shorts for user server");
        //for (var s in shorts) {
        //    if (shorts[s].userId == userId) {
        //        console.log("title is"+shorts[s].title);
        //        userShorts.push(shorts[s]);
        //    }
        //}
        //return userShorts;

        var deferred = q.defer();

        ShortModel.find({"userId":userId},function(err,shorts){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(shorts);

            }
        });
        return deferred.promise;

    }

    function findUserLikes(shortId){
        var deferred = q.defer();
        ShortModel.findById(shortId,function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                if(doc)
                    deferred.resolve(doc.likes);

            }

        });
        return deferred.promise;


    }

    function findReviewsForShort(shortId){

        var deferred = q.defer();
        console.log("inf find reviews for short",shortId);
        ShortModel.findOne({"ytID":shortId},function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log("in findReviewsForShort",JSON.stringify(doc));
                if(doc)
                    deferred.resolve(doc.reviews);

            }

        });
        return deferred.promise;

    }
    function findCommentsForShort(shortId){
        var deferred = q.defer();
        ShortModel.findById(shortId,function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                if(doc)
                    deferred.resolve(doc.comments);

            }

        });
        return deferred.promise;

    }

    function userLikesShort (userId, short) {

        var deferred = q.defer();

        // find the movie by youtube ID
        ShortModel.findOne({"ytID": short.id},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a movie
                if (doc) {
                    // add user to likes
                    doc.likes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    console.log("Short id:", short.id);
                    var new_short = new ShortModel({
                        ytID: short.id,
                        title: short.title,
                        description: short.description,
                        url:short.url,
                        language:short.language,
                        likes: []
                    });

                    console.log("Newly added short", JSON.stringify(new_short));
                    // add user to likes
                    new_short.likes.push (userId);
                    // save new instance
                    new_short.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function userUnlikesShort (userId, short) {

        var deferred = q.defer();

        // find the movie by youtube ID
        ShortModel.findOne({"ytID": short.id},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }


                if (doc) {
                    doc.likes.splice(doc.likes.indexOf(userId),1);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }

    function findUserLikes(shortId){
        var deferred = q.defer();
        ShortModel.findShortById(shortId,function(err, doc){
            if(err){
                deferred.reject(err);
            }
            if(doc){
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }
        function addShortReview(short, review){

            var deferred = q.defer();

            // find the movie by youtube ID
            ShortModel.findOne({"ytID": short.id},

                function (err, doc) {

                    // reject promise if error
                    if (err) {
                        deferred.reject(err);
                    }

                    // if there's a movie
                    if (doc) {
                        // add user to likes
                        doc.reviews.push (review._id);
                        // save changes
                        doc.save(function(err, doc){
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc.reviews);
                            }
                        });
                    } else {
                        console.log("Short id:", short.id);
                        var new_short = new ShortModel({
                            ytID: short.id,
                            title: short.title,
                            description: short.description,
                            url:short.url,
                            language:short.language,
                            reviews: []
                        });

                        console.log("Newly added short", JSON.stringify(new_short));
                        // add user to likes
                        new_short.reviews.push (review._id);
                        // save new instance
                        new_short.save(function(err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc.reviews);
                            }
                        });
                    }
                });

            return deferred.promise;

        }


    function deleteShortReview(shortId, reviewId){

        var deferred = q.defer();

        // find the movie by youtube ID
        ShortModel.findOne({"ytID": shortId},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                if (doc) {
                    console.log("In short model before splice",JSON.stringify(doc.reviews))
                    doc.reviews.splice(doc.reviews.indexOf(reviewId),1);
                    // save changes
                    console.log("In short model after splice",JSON.stringify(doc.reviews))
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc.reviews);
                        }
                    });
                }
            });

        return deferred.promise;


    }



};

