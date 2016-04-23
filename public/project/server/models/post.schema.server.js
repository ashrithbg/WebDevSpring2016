module.exports=function(mongoose){

    var CommentSchema = require("./comment.schema.server.js")(mongoose);

    var PostSchema = mongoose.Schema({
        "title":String,
        "description":String,
        "userId":String,
        "comments":[CommentSchema],
        "likes":[String],
        "createdByUser":String

    },{collection: 'project.shortkut.post'});

    return PostSchema;
};