module.exports = function(app) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.js")(db);
    var formModel   = require("./models/form.model.js")(db);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, userModel);
    var fieldService = require("./services/field.service.server.js")(app,formModel);
}