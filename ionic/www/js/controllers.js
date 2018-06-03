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
    vm.dele = {}
   
    $scope.chats = XnServe.all();
    //删除用户
    vm.remove = function (index,id) {
       vm.dele.wuWifi = false;
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
      },function(){
        vm.dele.wuWifi = true;
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
    vm.query = {};
    vm.addressList = [];
    vm.add_btn = false;

    function get(){
      XnServe.getOne({id:$stateParams.chatId}).then(function(res){
        if(res.status=='success'){
          console.log(res.data)
          vm.data = res.data;
          vm.query.user_id = res.data._id;
        }else{

        }
        
      },function(){

      }).then(function(){
        vm.addressList = [];
        if(vm.query.user_id){
          XnServe.getAddressList({'user_id':vm.query.user_id}).then(function(res){
          if(res.status=='success'){
            vm.addressList = res.data;
            console.log('该用户的地址',res.data)
          }
        })
        }
      })
    }
    get();

    //新增地址
    vm.setAddress = function(){
      if(!vm.query.user_id){
        console.log('缺少字段')
        return false;
      }
      console.log(vm.query)
      if(!vm.add_change_id){
        delete vm.query.id;
          XnServe.addAddr(vm.query).then(function(res){
          if(res.status=='success'){
            console.log('添加地址',res.data,vm.addressList)
            vm.addressList.push(res.data)
            $scope.$apply();
          }else{
            console.log('新增地址失败')
          }
        })
      }else{ // 修改地址
        vm.query.id = vm.add_change_id;
         XnServe.chanegAddr(vm.query).then(function(res){
          if(res.status=='success'){
            console.log('修改地址',res.data)
            if(res.data.noHas){
              alert(res.data.msg)
            }else{
              vm.addressList.splice(vm.addressList.indexOf(vm.addressList.find((item)=>{
                  return item._id = res.data._id;
                })
              ),1,res.data)
            }
            // vm.addressList.push(res.data)
            $scope.$apply();
          }else{
            console.log('修改地址失败')
          }
        })
      }
      
    }
    //新增按钮切换；
    vm.addNews = function(){
      vm.add_btn = !vm.add_btn;
      vm.add_change_id = '';
      vm.query.district  = '';
      vm.query.name = ''
      vm.query.phone = '';
    }
    //修改地址
    vm.changeAdr = function(item){
      vm.add_btn = false;
      if(vm.add_change_id==item._id){
        vm.add_change_id = '';
        return false;
      }
      vm.add_change_id = item._id;
      vm.query.name = item.name;
      vm.query.phone = item.phone;
      vm.query.district  = item.district;
    }
    vm.deleAddr = function(item){
      XnServe.deleAddr(item).then(function(res){
          if(res.status=='success'){
            console.log('删除地址',res.data)
            if(res.data.id){
              vm.addressList.splice(vm.addressList.indexOf(vm.addressList.find((item)=>{
                  return item._id = res.data.id;
                })
              ),1)
              $scope.$apply();
            }else if(res.data.noHas){
              alert(res.data.msg)
            }
          }else{
            console.log('删除地址失败')
          }
        })
    }
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
