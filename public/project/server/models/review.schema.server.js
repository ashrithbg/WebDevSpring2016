module.exports=function(mongoose){

    var ReviewSchema = mongoose.Schema({
        "review":String,
        "userId":String,
        "shortId":String,
        "rating":Number
    },{collection: 'project.shortkut.review'});

    return ReviewSchema;
};