var bbApp = angular.module('bbapp', ['ui.router','authmodule','ngDragDrop','toaster','ngCookies']);

bbApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('/', {
            url: '/login',
            templateUrl: 'html/login.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('dashboardadmin', {
            url:'/dashboardadmin',
            templateUrl:'html/dashboard_admin.html',
            authenticate: true 
        })

        .state('dashboarduser', {
            url:'/dashboarduser',
            templateUrl:'html/dashboard_admin.html',
            authenticate: true 
        });
        
});

bbApp.controller('loginController',['$rootScope','$scope','$cookies', 'authservice','$state','$timeout', function($rootScope, $scope,$cookies,authservice, $state,$timeout) {
        //authservice.setlogindetails($scope.username,$scope.password)
         $scope.verify=function(){
            authservice.setlogindetails($scope.username,$scope.password);
            $rootScope.user=authservice.authenticate($scope.username,$scope.password);
        
            $cookies.put('username',$rootScope.user)
            if($rootScope.user){
                $timeout(function() { $state.go('dashboard'+$scope.user); });   
            }
            else{
                $timeout(function() { $state.go('/'); });
                $scope.errorMsg="Invalid credentials. Try again."
            }    //$('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+"Invalid username/password"+'</span></div>');
    }
        
        
    }]);

bbApp.controller('mainController', ['$scope', 'authservice', '$state', '$timeout','$cookies', 
    function($scope, authservice,$state, $timeout,$cookies){
    }]);

bbApp.controller('dragdropController',['$rootScope', '$scope','$timeout','toaster', '$state','$stateParams','$cookies', '$location',
    function($rootScope, $scope, $timeout,toaster,$state,$stateParams, $cookies, $location){
    $scope.list1 = [];
      $scope.list2 = [];
      $scope.list3 = [];
      $scope.list4 = [];
      window.x = $scope;
      console.log($location.path())
      window.c = $cookies;
      $scope.user=$cookies.get('username')
      $scope.url = $location.path();
            if($cookies.get('username'))
                $timeout(function() { $state.go('dashboard'+$cookies.get('username')); });   
            else
                $timeout(function() { $state.go('/'); });
      $scope.list5 = [
        { 'title': 'item1', 'drag': true },
        { 'title': 'item2', 'drag': true },
        { 'title': 'item3', 'drag': true },
        { 'title': 'item4', 'drag': true },
        { 'title': 'item5', 'drag': true }
      ];


      $scope.notify=function(event,ui){
        toaster.pop('success', "BlogBeats", ui.draggable[0].innerHTML+" is dropped into "+event.target.id);
        
      };




}]);

bbApp.run([ '$state','$rootScope','$cookies','$window',
  function( $state,$rootScope,$cookies,$window){

       $rootScope.logout = function(){
        $cookies.remove('username');
        $state.go('/')
        // $window.location.href = '/';
      }
}]);