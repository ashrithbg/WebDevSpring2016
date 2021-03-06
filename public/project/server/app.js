module.exports = function(app, db, mongoose) {
    //var reviewModel   = require("./models/review.model.js")(db, mongoose);
    var userModel    = require("./models/user.model.js")(db, mongoose);
    var postModel   = require("./models/post.model.js")(db, mongoose);
    var shortModel   = require("./models/short.model.js")(db, mongoose);


    var userService  = require("./services/user.service.server.js") (app,userModel, postModel, shortModel);
    var postService = require("./services/post.service.server.js")(app, userModel, postModel);
    var shortService = require("./services/short.service.server.js")(app, userModel, shortModel);
    var youtubeService = require("./services/youtube.service.server.js")(app);
};

