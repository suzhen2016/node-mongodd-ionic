angular.module('starter.services', [])

.factory('XnServe', function($q,$http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
  var http = function(method,api,data){
   return new Promise(function(resolve, reject){
            $http({
                  method: method,
                  url:"http://localhost:3000/"+api,
                  data:data
            }).then(function(rep){
                if(rep.data.status=='success'){
                  resolve(rep.data)
                }else{
                  reject(rep.data)
              }
          })
        }) 
  }
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    add:function(data){
        return http("post","addUser",data);
    },
    getList:function(){
       return http("post","get_list");
    },
    deleUser:function(data){
      return http('post',"dele_user",data)
    },
    ceshi:function(){
        return http("get","y");
    },
    getOne:function(data){
      return http('post','get_one',data)
    },
    addAddr:function(data){
      return http('post','add_addr',data)
    },
    getAddressList:function(data){
      return http('post','get_addrss_list',data)
    },
    chanegAddr:function(data){
      return http('post','change_address',data)
    },
    deleAddr:function(data){
      return http('post','dele_address',data)
    }


  };
});
