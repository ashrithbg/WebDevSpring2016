module.exports = function(app, db, mongoose) {

    var userModel    = require("./models/user.model.js")(db, mongoose);
    var postModel   = require("./models/post.model.js")(db, mongoose);
    var shortModel   = require("./models/short.model.js")(db, mongoose);
    var reviewModel   = require("./models/review.model.js")(db, mongoose);
    var commentModel   = require("./models/comment.model.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app,userModel);
    var postService = require("./services/post.service.server.js")(app, userModel, postModel, commentModel);
    var shortService = require("./services/short.service.server.js")(app, userModel, shortModel, commentModel, reviewModel);
    var youtubeService = require("./services/youtube.service.server.js")(app);
};

