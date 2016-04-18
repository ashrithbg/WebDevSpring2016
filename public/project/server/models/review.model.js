var q = require("q");
module.exports=function(db, mongoose){
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // create user model from schema
    var ReviewModel = mongoose.model('Review', ReviewSchema);

    var api={
        findReviewById:findReviewById,
        findAllReviewsByUser:findAllReviewsByUser,
        findAllReviewsForShort:findAllReviewsForShort,
        createReviewForUser:createReviewForUser,
        deleteReviewById:deleteReviewById,
        updateReviewById:updateReviewById,
        findReviewsByIds:findReviewsByIds
    };
    return api;
    function findReviewById(reviewId){
        var deferred = q.defer();
        ReviewModel.findById(reviewId,function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;


    }

    function findAllReviewsByUser(userId){
        var deferred = q.defer();
        ReviewModel.find({"userId":userId},function(err,doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function createReviewForUser(userId, user, short, review){


        var newReview = {
            username:user,
            content: review.content,
            userId: userId,
            shortId: short.id
        };
        var deferred = q.defer();
        ReviewModel.create(newReview, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }

        });

        return deferred.promise;



    }

    function deleteReviewById(reviewId){
        var deferred = q.defer();
        ReviewModel.remove({"_id":reviewId}, function(err,docs){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(docs);
            }
        });

        return deferred.promise;


    }
    function updateReviewById(reviewId, review){

        var deferred = q.defer();

        ReviewModel.findById({"_id":reviewId},function(err,found_review){
            if(err){
                deferred.reject(err);
            }
            else {
                //found_short.title = newShort.title;
                //found_short.userId = newShort.userId;
                //found_short.description = found_short.description;
                //found_short.url = found_short.url;
                //found_short.language = found_short.language;
                //found_short.comments = newShort.comments;
                //found_short.likes = newShort.likes;
                console.log("In review model",JSON.stringify(review));
                found_review.content = review.content;
                found_review.userId = review.userId;
                found_review.shortId = review.shortId;
                found_review.username = review.username;
                found_review.save(function (err, updated_review) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(updated_review);
                    }

                });


            }});
        return deferred.promise;

    }

        function findAllReviewsForShort(shortId){
            var deferred = q.defer();
            ReviewModel.find({"shortId":shortId},function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }
            });
            return deferred.promise;

        }

    function findReviewsByIds (ids) {

        var deferred = q.defer();
        var reviewIds = [];
        for(var r in ids){
            reviewIds.push(ids[r]._id);
        }
        // find all movies
        // whose imdb IDs
        // are in imdbIDs array
        ReviewModel.find({
            _id: {$in: reviewIds}
        }, function (err, reviews) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(reviews);
            }
        });
        return deferred.promise;
    }

};