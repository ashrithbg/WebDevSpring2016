(function () {
    angular
        .module ("ShortKutApp")
        .factory ("ShortService", ShortService);

    function ShortService ($sce) {


        var shorts =[
            {"id":121,"userId":123,"title":"Lorem ipsum1", "language":"English", "description":"Tote bag twee butcher", "url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/XGSy3_Czz8k")},
            {"id":111,"userId":123,"title":"Lorem ipsum2", "language":"English","description":"Tote bag twee butcher", "url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/VW5nphkHmUQ")},
            {"id":12212,"userId":123,"title":"Lorem ipsum3", "language":"English","description":"Tote bag twee butcher","url":$sce.trustAsResourceUrl("https://www.youtube.com/embed/WwV7ENOTeek")}
        ];
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

        function addShortForUser(userId,newShort,callback) {

            var newShort = {
                id: (new Date).getTime(),
                title:newShort.title,
                userId:userId,
                language:newShort.language,
                url:$sce.trustAsResourceUrl(newShort.url),
                description:newShort.description
            };
            shorts.push(newShort);
            console.log("after adding"+shorts);
            callback(newShort);

        }
        function deleteShortById(shortId,callback) {
            var shortToDelete = null;
            findShortById(shortId,
                function(short){
                    shortToDelete = short;

            });
            console.log(shortToDelete.id);
            if(shortToDelete!=null){
                shorts.splice(shorts.indexOf(shortToDelete),1);
            }
            callback(shorts);
        }
        function updateShortById (shortId,newShort,callback) {
            console.log("id is"+newShort.id+"  title is"+newShort.title);
            for(var s in shorts){
                if (shorts[s].id === shortId){
                    console.log("id is "+shorts[s].id);
                    var updatedShort = {
                        id:shortId,
                        title:newShort.title,
                        userId:newShort.userId,
                        language:newShort.language,
                        url:newShort.url,
                        description:newShort.description
                    };
                    shorts[s] = updatedShort;
                    callback(updatedShort);
                }
            }
        }
        function getShortsByUser(userId,callback){
            var userShorts=[];
            for(var s in shorts) {
                if(shorts[s].userId === userId){
                    console.log(shorts[s].title);
                    userShorts.push(shorts[s]);
                }
            }
            callback(userShorts);
        }
        function findShortById(shortId,callback){
            console.log("form id"+shortId);
            for(var s in shorts){
                console.log("id "+shorts[s].id);
                console.log("title "+shorts[s].title);
                if (shorts[s].id == shortId){
                    console.log(shorts[s].title);
                    console.log("Found a short"+shorts[s].id);
                    callback(shorts[s]);
                }
            }
            //callback(null);
        }

        function findShortsForUser(userId,callback)
        {
            var userShorts=[];
            for(var s in shorts) {
                if(shorts[s].userId === userId){
                    console.log(shorts[s].title);
                    userShorts.push(shorts[s]);
                }
            }
            callback(userShorts);

        }
    }
})();