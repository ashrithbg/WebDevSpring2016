"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope,$location,FormService,UserService)
    {

        UserService.loggedIn();
        var currentUser = UserService.getCurrentUser();

        FormService.
            findAllFormsForUser(currentUser._id).
                then(
                    function(response){
                        $scope.forms =response.data;
                    },function(err){
                        console.log("error");
                        $scope.forms={};
            });

        $scope.$location = $location;
        var selectedIndex = -1;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;


        function addForm(form){
            if(!form || !form.title)
                return;
            FormService.createFormForUser(
                currentUser._id,form)
                .then(
                    function(response){
                        $scope.forms = response.data;
                        $scope.form = {};
                    },
                    function(err){
                        console.log("Error retrieving forms");
                    }
            );


        }
        function updateForm(form){
            FormService.updateFormById(form._id,
                form).then(
                    function(response){
                        if (selectedIndex>=0){
                            $scope.forms[selectedIndex]=response.data;
                            $scope.form={};
                            selectedIndex=-1;
                        }
                    },function(err){
                        console.log("Error updating form");
                    });
        }
        function deleteForm(index){
            var forms = $scope.forms;
            var formId = forms[index]._id;
            FormService.deleteFormById(
                formId).then(
                function(response){
                    FormService.
                    findAllFormsForUser(currentUser._id).
                    then(
                        function(response){
                            $scope.forms =response.data;
                        },function(err){
                            $scope.forms={};
                        });
            },function(err){
                    console.log("Error deleting form");
                });
            console.log($scope.forms);

        }

        function selectForm(index){
            selectedIndex = index;
            console.log("selectedIndex ::"+selectedIndex);
            console.log("id:"+$scope.forms[index]._id);
            var selectedForm= {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };
            $scope.form = selectedForm;

        }

    }
})();