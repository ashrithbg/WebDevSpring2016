module.exports = function(app) {

    var userModel    = require("./models/user.model.js")();
    var postModel   = require("./models/post.model.js")();
    var shortModel   = require("./models/short.model.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var postService = require("./services/post.service.server.js")(app, userModel, postModel);
    var shortService = require("./services/short.service.server.js")(app, userModel, shortModel);
    var youtubeService = require("./services/youtube.service.server.js")(app);
};