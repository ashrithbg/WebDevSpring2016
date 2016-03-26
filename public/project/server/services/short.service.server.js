module.exports=function(app, userModel, shortModel){

    app.get("/api/project/user/:userId/shorts",getShorts);
    app.get("/api/project/short/:shortId",getShort);
   // app.get("/api/project/short",);
    app.post("/api/project/user/:userId/short",addShort);
    app.delete("/api/project/short/:shortId",deleteShort);
    app.put("/api/project/short/:shortId",updateShort);


    function getShorts(req, res){
        var user = req.params.userId;
        res.json(shortModel.findShortsForUser(user));

    }

    function getShort(req, res){
        res.json(shortModel.findShortById(req.params.shortId));
    }

    function addShort(req, res){
        var short = req.body;
        res.json(shortModel.addShortForUser(req.params.userId, short));

    }

    function updateShort(req, res){
        var short = req.body;
        res.json(shortModel.updateShortById(req.params.shortId,short));
    }

    function deleteShort(req, res){
        res.json(shortModel.deleteShortById(req.params.shortId));
    }


}