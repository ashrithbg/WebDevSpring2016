(function(){


    angular
        .module("ShortKutApp")
        .controller("SearchDetailsController", SearchDetailsController);

    function SearchDetailsController($scope, $http, $routeParams, UserService, ShortService, YoutubeService) {
        var vm = this;
        var id = $routeParams.id;
        console.log(id);
        var currentUser = null;

        vm.updateFlag = false;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;
        vm.reviewShort = reviewShort;
        vm.selectedReview = selectedReview;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;
        vm.cancel = cancel;

        function init() {
            UserService.getCurrentUser().then(function(response){
                    currentUser = response.data;
                    //vm.likes =response.data.shortLikes;

                     vm.likes =[];
                     vm.reviews =[];
                     if(currentUser.shortLikes.indexOf(id) > -1) {
                         console.log("Short liked",currentUser._id);
                         vm.likes.push(currentUser._id);
                     }

                    ShortService.findUserLikes(id).then(
                        function(response){
                            console.log(JSON.stringify(response.data));
                            vm.userLikes=[];
                            for(var like in response.data){
                                if(response.data[like]._id !=currentUser._id){
                                    vm.userLikes.push(response.data[like]);
                                }

                            }
                        },
                        function(err){
                            console.log("Error retrieving user likes for this short ",JSON.stringify(err));

                        }
                    );
                    ShortService.findShortReviews(id).then(
                        function(response){
                            vm.userReviews = response.data;
                            for(var r in vm.userReviews){
                                if(currentUser._id == vm.userReviews[r].userId){
                                    vm.review = vm.userReviews[r].userId;
                                }
                            }
                        },function(err){
                            console.log("Error while retrieiving reviews for short",JSON.stringify(err));
                        });
                },
                function(err){
                    console.log("Error getting the current user",JSON.stringify(err));
                });


            fetchShort(id);

        }
        init();


        function fetchShort(id) {
            YoutubeService.findShortById(id).then(renderDetails,renderError);
        }

        function renderDetails(response) {
            if(response!=null)
                vm.details = response.data[0];
        }
        function renderError(err){
            console.log("Error while retrieving search details"+err);
        }
        function favorite(short) {
            if(currentUser) {
                //vm.likes = [];
                if(vm.likes.indexOf(currentUser._id) == -1) {
                    //console.log("Short liked",currentUser._id);
                    vm.likes.push(currentUser._id);
                }
                ShortService
                    .userLikesShort(currentUser._id, short);
            } else {
                $location.url("/login");
            }
        }
        function unfavorite(short) {
            if(currentUser) {
                vm.likes.splice(vm.likes.indexOf(currentUser._id),1);
                ShortService
                    .userUnlikesShort(currentUser._id, short);
            } else {
                $location.url("/login");
            }
        }

        function reviewShort (review,short){
            if(currentUser) {
                console.log("In search controller",JSON.stringify(short));
                console.log("In search controller",JSON.stringify(review));
                ShortService.addReview(currentUser._id,currentUser.username,short,review).then(
                    function(response){
                        console.log("reviews",JSON.stringify(response.data));
                        vm.userReviews=response.data;
                        vm.review = {};
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }

        }



        function updateReview(review,short){

            if(currentUser) {
                console.log("In search controller",JSON.stringify(short));
                console.log("In search controller",JSON.stringify(review));
                ShortService.updateReview(short.id,review._id,review).then(
                    function(response){
                        console.log("reviews",JSON.stringify(response.data));
                        vm.userReviews=response.data;
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }
        }
        function deleteReview(review,short){
            if(currentUser) {
                console.log("To be deleted review",JSON.stringify(review));
                ShortService.deleteReview(short.id,review._id).then(
                    function(response){
                        console.log("reviews",JSON.stringify(response.data));
                        vm.userReviews=response.data;
                    },
                    function(err){
                        console.log("Error retrieving reviews",console.log(err));
                    }
                );

            } else {
                $location.url("/login");
            }

        }
        function selectedReview(review){
            vm.updateFlag=true;
            var selectedReview= {
                _id: review._id,
                content: review.content,
                userId: review.userId,
                shortId: review.shortId
            };
            vm.review = selectedReview;

        }

        function cancel(){
            vm.review = {};
            vm.updateFlag = false;
        }
    }
})();