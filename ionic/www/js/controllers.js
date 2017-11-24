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
           
              ionicToast.show('已经存在该用户', 'middle', false, 1500);
            }
            
         }else{
          
         }
      })
    }

  }])

  .controller('ChatsCtrl', function ($scope, XnServe) {
    $scope.chats = XnServe.all();
    $scope.remove = function (chat) {
      XnServe.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, XnServe) {
    $scope.chat = XnServe.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
