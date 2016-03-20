(function()
{
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http)
    {

        var service = {
            findAllFormsForUser : findAllFormsForUser,
            createFormForUser:createFormForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById,
            findFormById:findFormById

        };

        return service;


        function findAllFormsForUser(userId)
        {
            return $http.get("/api/assignment/user/"+userId+"/form");

        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);


        }
        function createFormForUser(userId,form){
           return $http.post("/api/assignment/user/"+userId+"/form",form);
        }
        function updateFormById(formId,newForm){
            return $http.put("/api/assignment/form/"+formId,newForm);

        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/"+formId);
        }


    }
})();