(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http)
    {

        var service = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm:getFieldsForForm,
            getFieldForForm:getFieldForForm,
            deleteFieldFromForm:deleteFieldFromForm,
            updateField:updateField

        };

        return service;


        function getFieldsForForm(formId)
        {
            return $http.get("/api/assignment/form/"+formId+"/fields");

        }

        function deleteFieldFromForm(formId,fieldId){
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);


        }
        function createFieldForForm(formId,field){
            console.log("field in createFieldForForm"+JSON.stringify(field));
            return $http.post("/api/assignment/form/"+formId+"/field",field);
        }

        function updateField(formId,fieldId,field){
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field);

        }

        function getFieldForForm(formId,fieldId){
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }


    }
})();