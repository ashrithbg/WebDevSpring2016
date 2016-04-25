module.exports=function(mongoose){

    var ReviewSchema = mongoose.Schema({
        "content":String,
        "userId":String,
        "username":String,
        "rating":Number,
        "created":{type:Date, default:Date.now},
        "updated":{type:Date, default:Date.now}
    },{collection: 'project.shortkut.review'});

    return ReviewSchema;
};