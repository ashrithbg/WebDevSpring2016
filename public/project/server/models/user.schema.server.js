module.exports=function(mongoose){

    var UserSchema =mongoose.Schema({
        "firstName":String,
        "lastName":String,
        "username":String,
        "password":String,
        "roles":[String],
        "email":[String],
        "dob":{type:Date, default: Date.now},
        "description":String,
        followers: [String],
        following: [String],
        shortLikes: [String],
        postLikes:[String],
        postComments:[String],
        reviews: [String],
        type:String
    },{collection: 'project.shortkut.user'});

    return UserSchema;

};