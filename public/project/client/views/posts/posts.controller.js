"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("PostController",postController);

    function postController($scope,$location,UserService,PostService) {
        $scope.updateFlag = false;
        UserService.loggedIn();
        var currentUser= UserService.getCurrentUser().then(function(response) {
            console.log("current user in form controller " + JSON.stringify(response.data));
            currentUser = response.data;
            PostService.findAllPostsByUser(
                currentUser._id).then(
                function (response) {
                    console.log("posts",JSON.stringify(response.data));
                    $scope.posts = response.data;
                }, function (err) {
                    console.log("Error retrieving posts" + err);
                });
        });
        $scope.$location = $location;
        $scope.createPost = createPost;
        $scope.updatePost = updatePost;
        $scope.deletePost = deletePost;
        $scope.selectPost = selectPost;
        $scope.cancel = cancel;
        var selectedIndex = -1;

        function createPost(post){
            if(!post || !post.title)
            {
                $scope.error = "Please enter a title";
            }
            if(!post.description){
                $scope.error = "Please enter a description";
            }
            console.log("In posts"+JSON.stringify(post));
            PostService.createPostForUser(
                currentUser._id,
                post).then(
                function(response){
                    PostService.findAllPostsByUser(
                        currentUser._id).then(
                        function(response){
                            $scope.posts = response.data;
                            $scope.post = {};
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

                    if ($scope.selectedIndex>=0){
                        console.log("updated post"+JSON.stringify(response.data))
                        $scope.posts[$scope.selectedIndex]=response.data;
                        $scope.post={};
                        $scope.updateFlag=false;
                        //$scope.selectedIndex=-1;
                    }

                },function(err){
                    console.log("Error updating post"+err);
                }
            );
        }
        function deletePost(index){
            var posts = $scope.posts;
            var postId = posts[index]._id;
            console.log("post id to delete"+postId);
            PostService.deletePostById(
                postId).then(
                function(response){
                    PostService.findAllPostsByUser(
                        currentUser._id).then(
                        function(response){

                            $scope.posts =response.data;
                        },function(err){
                            console.log("Error retrieving posts"+err);
                        });
                });

        }
        function selectPost(index){
            //selectedIndex = index;
            $scope.updateFlag = true;
            console.log(index);
            var selectedPost= {
                _id: $scope.posts[index]._id,
                title: $scope.posts[index].title,
                userId: $scope.posts[index].userId,
                description: $scope.posts[index].description
            };
            $scope.post = selectedPost;
            $scope.selectedIndex = index;

        }

        function cancel(){
            $scope.updateFlag = false;
            $scope.post={};
        }



    }




})();