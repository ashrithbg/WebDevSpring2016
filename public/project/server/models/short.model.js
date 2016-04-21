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
        findShortsByUsernames:findShortsByUsernames
        //updateShortReview:updateShortReview

        //updateReview:updateReview,
        //updateComment:updateComment


    };
    return api;

    function youtubeID (url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    };

    function addShortForUser(userId, username,newShort) {



        var newShort = {
            title: newShort.title,
            userId: userId,
            language: newShort.language,
            url: "https://www.youtube.com/embed/"+youtubeID(newShort.url),
            description: newShort.description,
            ytID:youtubeID(newShort.url),
            createdByUser:username
        };
        var deferred = q.defer();
        ShortModel.create(newShort, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                var docs="";
                deferred.resolve(docs);
            }

        });

        return deferred.promise;

    }

    function deleteShortById(shortId) {
        var deferred = q.defer();
        ShortModel.remove({"ytID":shortId}, function(err,posts){
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

        var deferred = q.defer();
        ShortModel.findOne({"ytID":shortId},function(err,found_short){
            if(err){
                deferred.reject(err);
            }
            else {
                found_short.title = newShort.title;
                found_short.userId = newShort.userId;
                found_short.description = found_short.description;
                found_short.url = found_short.url;
                found_short.language = found_short.language;
                found_short.likes = newShort.likes;
                found_short.ytID = newShort.ytID;
                found_short.createdByUser = newShort.createdByUser;
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

        var deferred = q.defer();
        console.log("user id in find shorts for user",userId);
        ShortModel.find({"userId":userId},function(err,shorts){
            if(err){
                deferred.reject(err);
            }
            else{
                console.log("shorts in find shorts for user ",shorts);
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


        ShortModel.findOne({"ytID": short.id},

            function (err, doc) {


                if (err) {
                    deferred.reject(err);
                }


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
        ShortModel.findOne({"ytID": short.id},

            function (err, doc) {
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

            var shortId = short._id == null? short.id: short.ytID;
            ShortModel.findOne({"ytID": shortId},

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
                        console.log("Short id:", shortId);
                        var new_short = new ShortModel({
                            ytID: shortId,
                            title: short.title,
                            description: short.description,
                            url:short.url,
                            language:short.language,
                            reviews: []
                        });

                        new_short.reviews.push (review._id.toString());
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
        ShortModel.findOne({"ytID": shortId},

            function (err, doc) {


                if (err) {
                    deferred.reject(err);
                }

                if (doc) {


                    doc.reviews.splice(doc.reviews.indexOf(reviewId),1);
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

    function findShortsByUsernames(names){

        var deferred = q.defer();
        console.log("in findShortsByUsernames , list of followers",JSON.stringify(names));
        ShortModel.find({createdByUser: { $in: names}}, function (err, shorts) {
            if (err) {
                deferred.reject(err);
            }
            else {
                console.log("in findShortsByUsernames",JSON.stringify(shorts));
                deferred.resolve(shorts);
            }
        });
        return deferred.promise;

    }

};

