module.exports = function(){

    var FieldSchema = mongoose.Schema({
        label:String,
        type:{type:String, enum:['TEXT', 'EMAIL', 'PASSWORD',
            'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder:String,
        options: [{label:String,value:String}]
    },{collection: 'field'});

    return FieldSchema;


};