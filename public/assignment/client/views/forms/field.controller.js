"use strict";
(function() {
    var app = angular.module("FormBuilderApp");

    app.controller("FieldController",FieldController);

    function FieldController($scope,$routeParams,FieldService,FormService) {


        $scope.fields = getFields();
        $scope.form = FormService.findFormById($routeParams.formId);
        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.editField = editField;
        $scope.getFields = getFields;

        function getFields(){
            FieldService.getFieldsForForm(
                $routeParams.formId).
            then(function(response){
                $scope.fields = response.data;
            },function(err){
                console.log("Error retrieving fields")
            });
        }

        function addField(fieldType){

            FieldService.
                createFieldForForm($routeParams.formId,fieldType).
            then(
                function(response){
                    $scope.fields = response.data;
                },function(err){
                    console.log("Error creating fields");
                });

        }
        function editField(field){
            console.log("here"+field.type);
            $scope.field = field;
            if(field.type== "CHECKBOXES"|| field.type== "RADIOS"|| field.type == "DROPDOWN"){

                $scope.option_lines = field.options
                    .map(function (item) {
                        return item.label+":"+item.value;
                    })
                    .join('\n');
            }
            console.log("label"+field.label);
            FieldService.updateField($routeParams.formId,field._id,field)
                .then(function(response){
                    console.log(JSON.stringify(response.data));
                    $scope.fields = response.data;
                },function(err){
                    console.log("Error updating fields");
                });
        }
        function removeField(field){
            console.log("in delete"+JSON.stringify(field));
            FieldService.deleteFieldFromForm($routeParams.formId,field._id)
                .then(function(response){
                    console.log("response"+JSON.stringify(response));
                    $scope.fields = response.data;
                },function(err){
                    console.log("Error deleting fields");
                });
        }

    }

})();


