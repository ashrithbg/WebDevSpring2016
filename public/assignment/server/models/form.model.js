var forms = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports=function(){

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
        var userForms=[];

        for(var f in forms) {
            if(forms[f].userId == userId){

                userForms.push(forms[f]);
            }
        }
        return userForms;

    }

    function deleteFormById(formId){
        var form = findFormById(formId);
        if(form!=null){
            forms.splice(forms.indexOf(form),1);
        }
        return forms;

    }
    function createFormForUser(userId,form){
        var newForm = {
            _id: uuid.v1(),
            title: form.title,
            userId:userId
        };
        forms.push(newForm);
        return findAllFormsForUser(userId);

    }
    function updateFormById(formId,newForm){
        for(var f in forms){
            if (forms[f]._id == formId){
                var updatedForm = {
                    _id:newForm._id,
                    title:newForm.title,
                    userId:newForm.userId
                };
                forms[f] = updatedForm;
                return updatedForm;
            }
        }


    }

    function findFormById(formId){
        console.log("In find form by id"+formId);
        for(var f in forms){
            if (forms[f]._id == formId){
                console.log("Found form");
                return forms[f];
            }
        }
    }

    function findAllFieldsByForm(formId){
        for(var f in forms){
            if(forms[f]._id === formId){
                return forms[f].fields;
            }
        }


    }
    function findFieldByForm(formId,fieldId){
        for(var f in forms){
            if(forms[f]._id === formId) {
                var fields = forms[f].fields;
                for (var field in fields) {
                    if(field._id === fieldId){
                        return field;
                    }

                }
            }
        }
    }

    function createField(formId,field){
        //var form = findFormById(formId);
        console.log(JSON.stringify(field));
        var newField ={
            _id:uuid.v1(),
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options
        };
        for(var f in forms){
            if(forms[f]._id == formId) {
                forms[f].fields.push(newField);
                return forms[f].fields;
            }
        }
    }


    function deleteFieldById(formId,fieldId){
        for(var f in forms){
            if(forms[f]._id === formId) {
                var fields = forms[f].fields;
                for(var field in fields){
                    if(fields[field]._id == fieldId){
                        forms[f].fields.splice(field,1);
                        return forms[f].fields;

                    }
                }
            }
        }

    }
    function updateFieldById(formId,fieldId,field){
        var updatedField ={
            _id:field._id,
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options
        };

        for(var f in forms){
            if(forms[f]._id == formId) {
                var fields = forms[f].fields;

                for(var field in fields){
                    if(fields[field]._id == fieldId){
                        console.log("field id:"+fieldId);
                        forms[f].fields[field] = updatedField;
                        return forms[f].fields;

                    }
                }
            }
        }

    }

    function findFormByTitle(title){
        for(var f in forms){
            if(forms[f].title == title){
                return forms[f];
            }
        }
    }

}
