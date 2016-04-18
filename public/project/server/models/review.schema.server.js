module.exports=function(mongoose){

    var ReviewSchema = mongoose.Schema({
        "content":String,
        "userId":String,
        "shortId":String,
        "username":String
    },{collection: 'project.shortkut.review'});

    return ReviewSchema;
};