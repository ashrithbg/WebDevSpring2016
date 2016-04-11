module.exports=function(app, userModel, shortModel){

    app.get("/api/project/user/:userId/shorts",getShorts);
    app.get("/api/project/short/:shortId",getShort);
   // app.get("/api/project/short",);
    app.post("/api/project/user/:userId/short",addShort);
    app.delete("/api/project/short/:shortId",deleteShort);
    app.put("/api/project/short/:shortId",updateShort);
    app.post("/api/project/user/:userId/movie/:shortId", userLikesShort);

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
            .userLikesMovie(userId, shortYoutube)
            // add user to movie likes
            .then(
                function (movie) {
                    return userModel.userLikesMovie(userId, short);
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


};