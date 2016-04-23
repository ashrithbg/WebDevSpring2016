module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model


    var assignmentUserModel = require("../public/assignment/server/models/user.model.js")(db,mongoose);
    var formModel   = require("../public/assignment/server/models/form.model.js")(db,mongoose);

    var userService  = require("../public/assignment/server/services/user.service.server.js") (app, assignmentUserModel);
    var formService = require("../public/assignment/server/services/form.service.server.js")(app, formModel, assignmentUserModel);
    var fieldService = require("../public/assignment/server/services/field.service.server.js")(app,formModel);


    var reviewModel   = require("../public/project/server/models/review.model.js")(db, mongoose);
    var userModel    = require("../public/project/server/models/user.model.js")(db, mongoose);
    var postModel   = require("../public/project/server/models/post.model.js")(db, mongoose);
    var shortModel   = require("../public/project/server/models/short.model.js")(db, mongoose);


    var userService  = require("../public/project/server/services/user.service.server.js") (app,userModel, postModel, shortModel,assignmentUserModel);
    var postService = require("../public/project/server/services/post.service.server.js")(app, userModel, postModel);
    var shortService = require("../public/project/server/services/short.service.server.js")(app, userModel, shortModel, reviewModel);
    var youtubeService = require("../public/project/server/services/youtube.service.server.js")(app);



};