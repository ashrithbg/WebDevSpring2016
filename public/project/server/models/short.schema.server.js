module.exports=function(mongoose){
    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ShortSchema = mongoose.Schema({
        "title":String,
        "ytID":String,
        "description":String,
        "url":String,
        "language":String,
        "userId":String,
        "likes":[String],
        "createdByUser":String,
        "reviews":[String],
        "created":{type:Date, default:Date.now},
        "updated":{type:Date, default:Date.now}
    },{collection: 'project.shortkut.short'});

    return ShortSchema;
};