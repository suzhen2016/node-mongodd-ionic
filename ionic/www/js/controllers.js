angular.module('starter.controllers', [])
.directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                scope.$on('$ionicView.beforeEnter', function () {
                    scope.$watch(attributes.hideTabs, function (value) {
                        $rootScope.hideTabs = value;
                    });
                });

                scope.$on('$ionicView.beforeLeave', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
    })
  //添加
  .controller('DashCtrl', ['ionicToast','XnServe', '$scope', '$log', '$q', '$http',

    function (ionicToast,XnServe, $scope, $log, $q, $http) {

    var vm = $scope.vm = this;

    vm.addUser = function () {
      $log.debug('要添加的用户', vm.user)
      XnServe.add(vm.user).then(function(res){
         $log.debug('返回的信息', res)
         if(res.status=='success'){
            if(res.data.isHas){
              alert('该用户已经存在');
              ionicToast.show('已经存在该用户', 'middle', false, 1500);
            }
         }else{
          
         }
      })
    }


    function timeout(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
      });
    }

      timeout(100).then((value) => {
          console.log(value);
      });

      var promise = new Promise(function(resolve, reject) {
        console.log('Promise');
        resolve('成功了');
      });

      promise.then(function(val) {
        console.log('结果',val)
        console.log('resolved.');
      });

      console.log('Hi!');
    
  }])

  .controller('ChatsCtrl', function ($scope, XnServe,$log) {
    var vm = $scope.vm = this;
    $scope.chats = XnServe.all();
    //删除用户
    vm.remove = function (index,id) {
      console.log(index,id)
      //return false;
      XnServe.deleUser({id:id}).then(function(res){
        if(res.status=='success'){
            if(res.data){
              alert('删除成功')
              //vm.list.splice(index,1)
              console.log(vm.list.length)
            }else{
               alert('删除失败')
            }
        }else{
           alert('请求失败，删除失败')
        }
      })
    };
    vm.list = [];
    //查询用户；
    function getUser(){
       XnServe.getList().then(function(res){
         $log.debug('返回的信息', res)
         if(res.status=='success'){
          vm.list = res.data;
         }else{
          
         }
      })
    }
   
    $scope.doRefresh = function() {
       vm.list = [];
       getUser();
      $scope.$broadcast('scroll.refreshComplete');
    }
    
    
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, XnServe) {
    var vm = $scope.vm = this;
   
    function get(){
      XnServe.getOne({id:$stateParams.chatId}).then(function(res){
        if(res.status=='success'){
          console.log(res.data)
          vm.data = res.data;
        }
        
      })
    }
    get();
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
