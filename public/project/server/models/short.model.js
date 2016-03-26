var shorts = require("./short.mock.json");
module.exports=function() {

    var api = {
        //getAllMovies: getAllMovies,

        addShortForUser: addShortForUser,
        deleteShortById: deleteShortById,
        updateShortById: updateShortById,
        findShortsForUser:findShortsForUser,
        findShortById:findShortById
    };
    return api;

    function addShortForUser(userId, newShort) {

        var newShort = {
            id: (new Date).getTime(),
            title: newShort.title,
            userId: userId,
            language: newShort.language,
            url: newShort.url,
            description: newShort.description
        };
        shorts.push(newShort);
        console.log("after adding" + shorts);
        return newShort;

    }

    function deleteShortById(shortId) {
        var shortToDelete = findShortById(shortId);
        console.log(shortToDelete.id);
        if (shortToDelete != null) {
            shorts.splice(shorts.indexOf(shortToDelete), 1);
        }
        return shorts;
    }

    function updateShortById(shortId, newShort) {
        console.log("id is" + newShort.id + "  title is" + newShort.title);
        for (var s in shorts) {
            if (shorts[s].id == shortId) {
                console.log("id is " + shorts[s].id);
                var updatedShort = {
                    id: shortId,
                    title: newShort.title,
                    userId: newShort.userId,
                    language: newShort.language,
                    url: newShort.url,
                    description: newShort.description
                };
                shorts[s] = updatedShort;
                return short[s];
            }
        }
    }

    //function getShortsByUser(userId) {
    //    var userShorts = [];
    //    for (var s in shorts) {
    //        if (shorts[s].userId === userId) {
    //            console.log(shorts[s].title);
    //            userShorts.push(shorts[s]);
    //        }
    //    }
    //    return userShorts;
    //}

    function findShortById(shortId) {
        console.log("form id" + shortId);
        for (var s in shorts) {
            console.log("id " + shorts[s].id);
            console.log("title " + shorts[s].title);
            if (shorts[s].id == shortId) {
                console.log(shorts[s].title);
                console.log("Found a short" + shorts[s].id);
                return shorts[s];
            }
        }
        return null;
        //callback(null);
    }

    function findShortsForUser(userId) {
        var userShorts = [];
        console.log("In find shorts for user server");
        for (var s in shorts) {
            if (shorts[s].userId == userId) {
                console.log("title is"+shorts[s].title);
                userShorts.push(shorts[s]);
            }
        }
        return userShorts;

    }

}

