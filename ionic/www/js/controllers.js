angular.module('starter.controllers', [])
  //添加
  .controller('DashCtrl', function (XnServe,$scope,$log,$q,$http) {
    var vm = $scope.vm = this;
    vm.addUser = function () {
        $log.debug('要添加的用户',vm.user)
         var defer = $q.defer();
            var promise = defer.promise;
            XnServe.add(vm.user).then(function(data){
                $log.debug('添加返回值',data)
            })
            // promise.then(function(data){
            //     $scope.data = data;
            // })
        
    }
  })

  .controller('ChatsCtrl', function ($scope, XnServe) {
  

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, XnServe) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
