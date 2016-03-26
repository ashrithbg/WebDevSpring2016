(function(){


    angular
        .module("ShortKutApp")
        .controller("PostDetailsController", PostDetailsController);

    function PostDetailsController($scope, $http, $routeParams, PostService) {
        var vm = this;

        var id = $routeParams.id;
        console.log(id);

        function init() {
            fetchPost(id);
        }
        init();

        function fetchPost(id) {
            PostService.findPostById(id).then(renderDetails,renderError);
        }

        function renderDetails(response) {
            if(response!=null)
                vm.details = response.data;
        }
        function renderError(err){
            console.log("Error while retrieving post details"+JSON.stringify(err));
        }
    }
})();