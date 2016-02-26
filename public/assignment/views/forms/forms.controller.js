(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope,$location,$rootScope, FormService)
    {    console.log("here"+$rootScope.currentUser);
        $scope.login = login;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var service ={
            login: login,
            addForm: addForm,
            updateForm: updateForm,
            deleteForm: deleteForm,
            selectForm: selectForm
        };

        return service;

        //$scope.user = UserService.findUserById($routeParams.id);

        function login(){
            console.log("here"+$rootScope.currentUser);
            if(typeof $rootScope.currentUser === 'undefined'){

                $location.url("/home");
            }

        }
        function addForm(form){
            var newForm = FormService.createFormForUser($rootScope.user.id, form);
            return newForm;
        }
        function updateForm(index){
            var form = forms.indexOf()

        }
        function deleteForm(userId, callback){

        }

        function selectForm(){

        }

    }
})();