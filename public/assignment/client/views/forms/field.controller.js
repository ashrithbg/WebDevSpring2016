"use strict";
(function() {
    var app = angular.module("FormBuilderApp");

    app.controller("FieldController",FieldController);

    function FieldController($scope,$routeParams,FieldService,FormService,UserService) {

        UserService.loggedIn();
        $scope.fields = getFields();
        FormService.findFormById($routeParams.formId).
            then(function(response){
                $scope.form=response.data
                },function(err){
                    console.log("Could not retrieve form");
            });
        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.editField = editField;
        $scope.getFields = getFields;
        $scope.displayField = displayField;

        function getFields(){
            FieldService.getFieldsForForm(
                $routeParams.formId).
            then(function(response){
                $scope.fields = response.data;
            },function(err){
                console.log("Error retrieving fields")
            });
        }

        function addField(index){
            if(!index)
                return;

            var fieldTypes = [
                //Single Line Text Field
                {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
                //Date Field
                {"_id": null, "label": "New Date Field", "type": "DATE"},
                //DropDownField
                {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]},
                //Checkboxes Field
                {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]},
                //Radio Buttons Field
                {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]},
                //Multi Line Text Field
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}

            ];
            FieldService.
                createFieldForForm($routeParams.formId,fieldTypes[index]).
            then(
                function(response){
                    $scope.fields = response.data;
                },function(err){
                    console.log("Error creating fields");
                });

        }
        function editField(field){
            var options = [];
            if(field.type== "CHECKBOXES"|| field.type== "RADIOS"|| field.type == "DROPDOWN"|| field.type == "OPTIONS"){
                var optionList = field.options.split("\n");
                for(var option in optionList){
                    var optionArray = optionList[option].split(":");
                    options.push({
                        "label":optionArray[0],
                        "value":optionArray[1]
                    });
                }
                field.options = options;
            }
            FieldService.updateField($routeParams.formId,field._id,field)
                .then(function(response){
                    console.log(JSON.stringify(response.data));
                    $scope.fields = response.data;
                },function(err){
                    console.log("Error updating fields");
                });

        }

        function displayField(field){
            var modal = field;

            var modalField ={
                _id:modal._id,
                label:modal.label,
                type:modal.type,
                placeholder:modal.placeholder
            };

            var options=[];
            console.log("options"+modal.options);
            var fieldOptions = modal.options;
            if(field.type== "CHECKBOXES"|| field.type== "RADIOS"|| field.type == "DROPDOWN"|| field.type == "OPTIONS"){

                for (var index in  fieldOptions){
                    var option = fieldOptions[index].label + ":" + fieldOptions[index].value + "\n";
                    options.push(option);
                }
                console.log(options);
                modalField.options = options.join("");

            }
            $scope.modal= modalField;


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


