(function () {
    angular
        .module ("ShortKutApp")
        .factory ("ShortService", ShortService);

    function ShortService ($http) {

        //
        //var shorts =[
        //    {"id":121,"userId":123,"title":"Lorem ipsum123", "language":"English", "description":"Tote bag twee butcher", "url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/XGSy3_Czz8k")},
        //    {"id":111,"userId":123,"title":"Lorem ipsum123", "language":"English","description":"Tote bag twee butcher", "url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/VW5nphkHmUQ")},
        //    {"id":12212,"userId":345,"title":"Lorem ipsum345", "language":"English","description":"Tote bag twee butcher","url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/WwV7ENOTeek")},
        //    {"id":21212,"userId":345,"title":"Lorem ipsum345", "language":"Korean", "description":"Tote bag twee butcher", "url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/HQwd-Qx4ci0")},
        //    {"id":3456,"userId":456,"title":"Lorem ipsum456", "language":"Korean","description":"Tote bag twee butcher", "url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/qXNT0m7QZ2k")},
        //    {"id":76788,"userId":567,"title":"Lorem ipsum567", "language":"English","description":"Tote bag twee butcher","url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/RqCsMW90W0k")}
        //
        //];
        var api = {
            //getAllMovies: getAllMovies,
            getShortsByUser: getShortsByUser,
            addShortForUser: addShortForUser,
            deleteShortById: deleteShortById,
            updateShortById: updateShortById,
            findShortsForUser:findShortsForUser,
            findShortById:findShortById
        };
        return api;

        function addShortForUser(userId,newShort) {

            return $http.post("/api/project/user/"+userId+"/short",newShort);

        }
        function deleteShortById(shortId) {
            return $http.delete("/api/project/short/"+shortId);
        }
        function updateShortById (shortId,newShort) {
            return $http.put("/api/project/short/"+shortId, newShort);
        }
        function getShortsByUser(userId){
            return $http.get("/api/project/user/"+userId+"/shorts");
        }
        function findShortById(shortId){
           return $http.get("/api/project/short/"+shortId);
            //callback(null);
        }

        function findShortsForUser(userId) {
            return $http.get("/api/project/user/"+userId+"/shorts");
        }
    }
})();