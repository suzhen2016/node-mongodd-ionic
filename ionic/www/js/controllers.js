angular.module('starter.controllers', [])
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
              vm.list.splice(index,1)
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
    $scope.chat = XnServe.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
