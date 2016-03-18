var forms = require("./form.mock.json");

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
        deleteField:deleteField,
        updateField:updateField
    };

    return api;

    function findAllFormsForUser(userId)
    {
        var userForms=[];
        for(var f in forms) {
            if(forms[f].userId === userId){
                console.log(forms[f].title);
                userForms.push(forms[f]);
            }
        }
        return userForms;

    }

    function deleteFormById(formId,callback){
        var form = findFormById(formId);
        console.log(form.title);
        if(form!=null){
            forms.splice(forms.indexOf(form),1);
        }
        return forms;

    }
    function createFormForUser(userId,form,callback){
        var newForm = {
            _id: (new Date).getTime(),
            title: form.title,
            userId:userId
        };
        forms.push(newForm);
        return newForm;

    }
    function updateFormById(formId,newForm,callback){

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
        console.log("form id"+formId);
        for(var f in forms){
            if (forms[f]._id === formId){
                console.log(forms[f]);
                return forms[f];
            }
        }
        return null;
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

    function createField(field,formId){
        //var form = findFormById(formId);
        var newField ={
            _id:field._id,
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options
        };
        for(var f in forms){
            if(forms[f]._id === formId) {
                forms[f].fields.push(newField);
                return forms[f].fields;
            }
        }
    }


    function deleteField(fieldId,formId){
        for(var f in forms){
            if(forms[f]._id === formId) {
                var fields = forms[f].fields;
                for(var field in fields){
                    if(field._id === fieldId){
                        forms[f].fields = fields.splice(fields.indexOf(field),1);
                        return forms[f].fields;
                    }
                }
            }
        }

    }
    function updateField(field,formId){
        var updatedField ={
            _id:field._id,
            type:field.type,
            placeholder:field.placeholder,
            label:field.label,
            options:field.options
        };

        for(var f in forms){
            if(forms[f]._id === formId) {
                forms[f].fields.push(updatedField);
                return forms[f].fields;
            }
        }

    }

}
