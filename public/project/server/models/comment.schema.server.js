module.exports=function(mongoose){

    var CommentSchema = mongoose.Schema({
        "content":String,
        "userId":String,
        "username":String
    },{collection: 'project.shortkut.comment'});

    return CommentSchema;
};