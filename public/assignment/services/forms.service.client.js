(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService()
    {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ]

        var service = {
            findAllFormsForUser : findAllFormsForUser,
            createFormForUser:createFormForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById

        };

        return service;

        function findAllFormsForUser(userId,callback)
        {
            return users;
        }

        function deleteFormById(formId,callback){
            var form = findFormById(formId);
            if(form!=null)
                forms.splice(forms.indexOf(form),1);
            else{
                return null
            }

        }
        function createFormForUser(userId,form,callback){
            var newForm = {
                title: form.name,
                userId:userId
            };
            forms.push(form);
            return form;

        }
        function updateFormById(formId,newForm,callback){

        }
        function findFormById(formId){
            return forms[formId];
        }


    }
})();