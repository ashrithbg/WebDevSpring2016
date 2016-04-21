"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("PostController",postController);

    function postController($location,UserService,PostService) {
        var vm = this;
        vm.updateFlag = false;
        var currentUser= null;

        vm.$location = $location;
        vm.createPost = createPost;
        vm.updatePost = updatePost;
        vm.deletePost = deletePost;
        vm.selectPost = selectPost;
        vm.cancel = cancel;
        var selectedIndex = -1;

        function init() {

            UserService.getCurrentUser().then(function (response) {
                console.log("current user in form controller " + JSON.stringify(response.data));
                currentUser = response.data;
                PostService.findAllPostsByUser(
                    currentUser._id).then(
                    function (response) {
                        console.log("posts", JSON.stringify(response.data));
                        vm.posts = response.data;
                    }, function (err) {
                        console.log("Error retrieving posts" + err);
                    });
            });
        }

        init();


        function createPost(post){
            if(!post || !post.title)
            {
                vm.error = "Please enter a title";
            }
            if(!post.description){
                vm.error = "Please enter a description";
            }
            console.log("In posts"+JSON.stringify(post));
            PostService.createPostForUser(
                currentUser._id,
                post).then(
                function(response){
                    PostService.findAllPostsByUser(
                        currentUser._id).then(
                        function(response){
                            vm.posts = response.data;
                            vm.post = {};
                        },function(err){
                            console.log("Error while retrieving the posts"+err);
                        });
                },
                function(err){
                    console.log("Error while creating the post"+err);
                }
            );


        }
        function updatePost(post){

            PostService.updatePostById(post._id,
                post).then(
                function(response){

                    if (vm.selectedIndex>=0){
                        console.log("updated post"+JSON.stringify(response.data))
                        vm.posts[vm.selectedIndex]=response.data;
                        vm.post={};
                        vm.updateFlag=false;
                        //vm.selectedIndex=-1;
                    }

                },function(err){
                    console.log("Error updating post"+err);
                }
            );
        }
        function deletePost(index){
            var posts = vm.posts;
            var postId = posts[index]._id;
            console.log("post id to delete"+postId);
            PostService.deletePostById(
                postId).then(
                function(response){
                    PostService.findAllPostsByUser(
                        currentUser._id).then(
                        function(response){

                            vm.posts =response.data;
                        },function(err){
                            console.log("Error retrieving posts"+err);
                        });
                });

        }
        function selectPost(index){
            //selectedIndex = index;
            vm.updateFlag = true;
            console.log(index);
            var selectedPost= {
                _id: vm.posts[index]._id,
                title: vm.posts[index].title,
                userId: vm.posts[index].userId,
                description: vm.posts[index].description
            };
            vm.post = selectedPost;
            vm.selectedIndex = index;

        }

        function cancel(){
            vm.updateFlag = false;
            vm.post={};
        }



    }




})();