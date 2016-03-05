(function(){
    angular
        .module("ShortKutApp")
        .factory("TrendService", TrendService);


    function TrendService(UserService) {

       UserService.getTrendingUsers(function(users){
           var trendingUsers = users;
        });






    }



})();