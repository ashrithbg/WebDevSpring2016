module.exports=function(mongoose){

    var FieldSchema = mongoose.Schema({
        label:String,
        type:{type:String, enum:['TEXT', 'EMAIL', 'PASSWORD',
            'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES','TEXTAREA']},
        placeholder:String,
        options: [{label:String,value:String}]
    },{collection: 'field'});

    return FieldSchema;
};