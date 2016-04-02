var forms = require("./form.mock.json");
var uuid = require('node-uuid');
var q = require('q');

module.exports=function(mongoose){

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form',FormSchema);

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field',FieldSchema);

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        createFormForUser:createFormForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormById:findFormById,
        findFormByTitle:findFormByTitle,
        findAllFieldsByForm:findAllFieldsByForm,
        findFieldByForm:findFieldByForm,
        createField:createField,
        deleteFieldById:deleteFieldById,
        updateFieldById:updateFieldById
    };

    return api;

    function findAllFormsForUser(userId)
    {
        //var userForms=[];
        //
        //for(var f in forms) {
        //    if(forms[f].userId == userId){
        //
        //        userForms.push(forms[f]);
        //    }
        //}
        //return userForms;


        var deferred = q.defer();

        FormModel.find({"userId":userId},function(err,forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);

            }
        });
        return deferred.promise;

    }

    function deleteFormById(formId){
        //var form = findFormById(formId);
        //if(form!=null){
        //    forms.splice(forms.indexOf(form),1);
        //}
        //return forms;
        var deferred = q.defer();
        FormModel.remove({"_id":formId}, function(err,forms){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(forms);
            }
        });

        return deferred.promise;

    }
    function createFormForUser(userId,form){
        var newForm = {
            title: form.title,
            userId:userId
        };
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.create(newForm, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                var docs="";
                if(doc){
                    docs=findAllFormsForUser(userId);
                }
                deferred.resolve(docs);
            }

        });

        // return a promise
        return deferred.promise;

    }
    function updateFormById(formId,newForm){
      console.log("formId :"+formId);
        var deferred = q.defer();

        FormModel.findById({"_id":formId},function(err,found_form){
            if(err){
                deferred.reject(err);
            }
            else{
                found_form.title = newForm.title;
                found_form.userId = newForm.userId;
                found_form.fields = newForm.fields;
                found_form.save(function(err,updated_form){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(updated_form);
                    }

                });


            }

        });

        return deferred.promise;

    }

    function findFormById(formId){
        //console.log("In find form by id"+formId);
        //for(var f in forms){
        //    if (forms[f]._id == formId){
        //        console.log("Found form");
        //        return forms[f];
        //    }
        //}
        var deferred = q.defer();
        FormModel.findById(formId,
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc);
                }

        });
        return deferred.promise;
    }

    function findAllFieldsByForm(formId){
        //for(var f in forms){
        //    if(forms[f]._id === formId){
        //        return forms[f].fields;
        //    }
        //}
        var deferred = q.defer();
        FormModel.findById(formId,
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    console.log("fields"+JSON.stringify(doc));
                    deferred.resolve(doc.fields);
                }

            });
        return deferred.promise;

    }
    function findFieldByForm(formId,fieldId){
        //for(var f in forms){
        //    if(forms[f]._id === formId) {
        //        var fields = forms[f].fields;
        //        for (var field in fields) {
        //            if(field._id === fieldId){
        //                return field;
        //            }
        //
        //        }
        //    }
        //}

        var deferred = q.defer();
        FormModel.find({"_id":formId,"fields._id":fieldId},
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(doc.fields[0]);
                }

            });
        return deferred.promise;

    }

    function createField(formId,field){
        //var form = findFormById(formId);
        console.log("New Field"+JSON.stringify(field));
        var newField ={
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options
        };
        //for(var f in forms){
        //    if(forms[f]._id == formId) {
        //        forms[f].fields.push(newField);
        //        return forms[f].fields;
        //    }
        //}
        var deferred = q.defer();
        FormModel.findById(formId).then(
            function(form){
                console.log("form",JSON.stringify(form));
                form.fields.push(newField);
                form.save(function(err,form){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(form.fields);
                    }
                });
        });
        return deferred.promise;



    }


    function deleteFieldById(formId,fieldId){
        //for(var f in forms){
        //    if(forms[f]._id === formId) {
        //        var fields = forms[f].fields;
        //        for(var field in fields){
        //            if(fields[field]._id == fieldId){
        //                forms[f].fields.splice(field,1);
        //                return forms[f].fields;
        //
        //            }
        //        }
        //    }
        //}
        var deferred = q.defer();
        FormModel.findById(formId).then(
            function(form){
                form.fields.id(fieldId).remove();
                form.save(function(err,form){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(form.fields);
                    }
                });
            });
        return deferred.promise;



    }
    function updateFieldById(formId,fieldId,field){
        //var updatedField ={
        //    _id:field._id,
        //    type:field.type,
        //    placeholder:field.placeholder,
        //    label:field.label,
        //    options:field.options
        //};
        //
        //for(var f in forms){
        //    if(forms[f]._id == formId) {
        //        var fields = forms[f].fields;
        //
        //        for(var field in fields){
        //            if(fields[field]._id == fieldId){
        //                console.log("field id:"+fieldId);
        //                forms[f].fields[field] = updatedField;
        //                return forms[f].fields;
        //
        //            }
        //        }
        //    }
        //}

        var deferred = q.defer();
        FormModel.findById(formId).then(
            function(form){
                var fieldToUpdate = form.fields.id(fieldId);
                fieldToUpdate.type = field.type;
                fieldToUpdate.placeholder = field.placeholder;
                fieldToUpdate.label = field.label;
                fieldToUpdate.options = field.options;
                form.save(function(err,form){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(form.fields);
                    }
                });
            });
        return deferred.promise;


    }

    function findFormByTitle(title){
        //for(var f in forms){
        //    if(forms[f].title == title){
        //        return forms[f];
        //    }
        //}
        var deferred = q.defer();
        FormModel.findOne({"title":title}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

};
