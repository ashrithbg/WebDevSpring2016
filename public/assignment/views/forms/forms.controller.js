(function()
{
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $routeParams,$rootScope, FormService)
    {
        $scope.login = login;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.id = $routeParams.id;

        var service ={
            login: login,
            addForm: addForm,
            updateForm: updateForm,
            deleteForm: deleteForm,
            selectForm: selectForm
        };

        return service;

        $scope.user = UserService.findUserById($routeParams.id);

        function login(){
            $rootScope = UserService.findUserByCredentials($rootScope.user);
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