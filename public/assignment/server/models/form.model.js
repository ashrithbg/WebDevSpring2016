var forms = require("./form.mock.json");

module.exports=function(){

    var api = {
        findAllFormsForUser : findAllFormsForUser,
        createFormForUser:createFormForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormById:findFormById,
        findFormByTitle:findFormByTitle

    };

    return api;

    function findAllFormsForUser(userId,callback)
    {
        var userForms=[];
        for(var f in forms) {
            if(forms[f].userId === userId){
                console.log(forms[f].title);
                userForms.push(forms[f]);
            }
        }
        callback(userForms);
        return;

    }

    function deleteFormById(formId,callback){
        var form = findFormById(formId);
        console.log(form.title);
        if(form!=null){
            forms.splice(forms.indexOf(form),1);
        }
        callback(forms);
        return;

    }
    function createFormForUser(userId,form,callback){
        var newForm = {
            _id: (new Date).getTime(),
            title: form.title,
            userId:userId
        };
        forms.push(newForm);
        callback(newForm);
        return;

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
                callback(updatedForm);
                return;
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

}
