"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope,$location,$rootScope,FormService,UserService)
    {
        var currentUser = UserService.getCurrentUser();
        if(typeof currentUser === 'undefined'){
            $location.url("/home");
        }
        else{
            FormService.findAllFormsForUser(
                currentUser._id,
                function(forms){
                    $scope.forms =forms;
                });
        }
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        var selectedIndex = -1;

        function addForm(form){
            if(!form || !form.title)
                return;
            FormService.createFormForUser(
                currentUser._id,
                form,
                function(form){
                    FormService.findAllFormsForUser(
                        currentUser._id,
                        function(forms){
                            $scope.forms = forms;
                            $scope.form = {};
                        });
                }
            )


        }
        function updateForm(form){
            FormService.updateFormById(form._id,
                form,
                function(form){
                    if (selectedIndex>=0){
                        $scope.forms[selectedIndex]=form;
                        $scope.form={};
                        selectedIndex=-1;
                    }

                }
            );
        }
        function deleteForm(index){
            var forms = $scope.forms;
            var formId = forms[index]._id;
            FormService.deleteFormById(
                formId,
                function(forms){
                    FormService.findAllFormsForUser(
                        currentUser._id,
                        function(deletedForms){
                            $scope.forms = deletedForms;
                        }
                    )
                });
            console.log($scope.forms);

        }

        function selectForm(index){
            selectedIndex = index;
            var selectedForm= {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };
            $scope.form = selectedForm;

        }

    }
})();