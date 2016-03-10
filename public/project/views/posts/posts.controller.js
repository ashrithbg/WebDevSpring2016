"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("PostController",postController);

    function postController($scope,$location,UserService,PostService) {

        UserService.logged_in();
        var currentUser= UserService.getCurrentUser();
        PostService.findAllPostsByUser(
            currentUser._id,
            function(posts){
                console.log(posts);
                $scope.posts =posts;
            });

        $scope.$location = $location;
        $scope.createPost = createPost;
        $scope.updatePost = updatePost;
        $scope.deletePost = deletePost;
        $scope.selectPost = selectPost;
        var selectedIndex = -1;

        function createPost(post){
            if(!post || !post.title)
                return;
            PostService.createPostForUser(
                currentUser._id,
                post,
                function(post){
                    PostService.findAllPostsByUser(
                        currentUser._id,
                        function(posts){
                            $scope.posts = posts;
                            $scope.post = {};
                        });
                }
            )


        }
        function updatePost(post){
            PostService.updatePostById(post.id,
                post,
                function(post){

                    if ($scope.selectedIndex>=0){
                        $scope.posts[$scope.selectedIndex]=post;
                        $scope.post={};
                        //$scope.selectedIndex=-1;
                    }

                }
            );
        }
        function deletePost(index){
            var posts = $scope.posts;
            var postId = posts[index].id;
            console.log("post id to delete"+postId);
            PostService.deletePostById(
                postId,
                function(posts){
                    PostService.findAllPostsByUser(
                        currentUser._id,
                        function(userPosts){
                            console.log(userPosts);
                            $scope.posts = userPosts;
                        }
                    )
                });

        }
        function selectPost(index){
            //selectedIndex = index;
            console.log(index);
            var selectedPost= {
                id: $scope.posts[index].id,
                title: $scope.posts[index].title,
                userId: $scope.posts[index].userId,
                description: $scope.posts[index].description
            };
            $scope.post = selectedPost;
            $scope.selectedIndex = index;

        }



    }




})();