"use strict";
(function() {
    var app = angular.module("ShortKutApp");

    app.controller("PostController",postController);

    function postController($scope,$location,$rootParams,UserService,PostService) {

        UserService.logged_in();
        PostService.findAllPostsByUser(
            currentUser._id,
            function(posts){
                $scope.posts =posts;
            });

        $scope.$location = $location;
        $scope.createPost = createPost;
        $scope.updatePost = updatePost;
        $scope.deletePost = deletePost;
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
            PostService.updatePostById($rootParams.id,
                post,
                function(post){
                    if (selectedIndex>=0){
                        $scope.posts[$rootParams.id]=post;
                        $scope.post={};
                    }

                }
            );
        }
        function deletePost(post){
            var posts = $scope.posts;
            var postId = posts[index]._id;
            PostService.deletePostById(
                postId,
                function(posts){
                    PostService.findAllPostsByUser(
                        currentUser._id,
                        function(deletedPosts){
                            $scope.posts = deletedPosts;
                        }
                    )
                });
            console.log($scope.posts);

        }



    }




})();