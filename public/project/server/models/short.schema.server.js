module.exports=function(mongoose){
    var CommentSchema = require("./comment.schema.server.js")(mongoose);
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ShortSchema = mongoose.Schema({
        "title":String,
        "description":String,
        "url":String,
        "language":String,
        "userId":String,
        "comments":[CommentSchema],
        "likes":[String],
        "likedBy":[{username:String}],
        "reviews":[ReviewSchema],
        "created":{type:Date, default:Date.now},
        "updated":{type:Date, default:Date.now}
    },{collection: 'project.shortkut.short'});

    return ShortSchema;
};