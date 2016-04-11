module.exports=function(mongoose){

    var CommentSchema = mongoose.Schema({
        "content":String,
        "userId":String,
        "postId":String,
        "shortId":String,
        "type":{type:String, enum:['POST','SHORT']}
    },{collection: 'project.shortkut.comment'});

    return CommentSchema;
};