(function () {
    angular
        .module ("ShortKutApp")
        .factory ("ShortService", ShortService);

    function ShortService ($http) {


        var api = {
            //getAllMovies: getAllMovies,
            getShortsByUser: getShortsByUser,
            addShortForUser: addShortForUser,
            deleteShortById: deleteShortById,
            updateShortById: updateShortById,
            findShortsForUser:findShortsForUser,
            findShortById:findShortById,
            userLikesShort:userLikesShort,
            userUnlikesShort:userUnlikesShort,
            findUserLikes: findUserLikes,
            findUserReviews: findUserReviews,
            findShortReviews:findShortReviews,
            addReview:addReview,
            updateReview:updateReview,
            deleteReview:deleteReview,
            findShortsByIds:findShortsByIds
        };
        return api;

        function addShortForUser(userId,newShort) {
            console.log("In add short client side user id "+ userId);
            return $http.post("/api/project/user/"+userId+"/short",newShort);

        }
        function deleteShortById(shortId) {
            return $http.delete("/api/project/short/"+shortId);
        }
        function updateShortById (shortId,newShort) {
            console.log("in update short client service",JSON.stringify(newShort));
            var response= $http.put("/api/project/short/"+shortId, newShort);
            console.log("In update short service client"+JSON.stringify(response));
            return response;
        }
        function getShortsByUser(userId){
            return $http.get("/api/project/user/"+userId+"/shorts");
        }
        function findShortById(shortId){
            console.log("in find short by id, short id is"+shortId);
           return $http.get("/api/project/short/"+shortId);
        }

        function findShortsForUser(userId) {
            console.log("In find shorts client side");
            return $http.get("/api/project/user/"+userId+"/shorts");
        }

        function userLikesShort(userId, short) {
            return $http.post("/api/project/user/"+userId+"/short/"+short.id, short);
        }
        function userUnlikesShort(userId, short) {
            return $http.post("/api/project/user/"+userId+"/unlike/short/"+short.ytID, short);
        }

        function findUserLikes(shortId){
            return $http.get("/api/project/short/"+shortId+"/likes");
        }
        function findUserReviews(userId){
            return $http.get("/api/project/user/"+userId+"/reviews");
        }
        function findShortReviews(shortId){
            return $http.get("/api/project/short/"+shortId+"/reviews");
        }
        function addReview(userId,username,short,review){
            console.log("In add review client service user Id is "+userId);
            console.log("In add review client service review "+ JSON.stringify(review));
            console.log("In add review client service short "+ JSON.stringify(short));
            return $http.post("/api/project/user/"+userId+"/short/review",{"review":review,"short":short,"username":username});
        }
        function updateReview(shortId, reviewId, review){
            console.log("short id is ",shortId);
            return $http.put("/api/project/short/"+shortId+"/review/"+reviewId,review);
        }
        function deleteReview(shortId, reviewId){
            return $http.delete("/api/project/short/"+shortId+"/review/"+reviewId);
        }

        function findShortsByIds(ids){
            return $http.post("/api/project/shorts/reviews",ids);
        }

    }
})();