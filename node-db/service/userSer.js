
let userModel = require('../config/crudCfg')('user');//获得数据操作的方法
module.exports = {
    //添加用户
    add: function (param) {
        return new Promise(function (resolve, rejec) {
            userModel.add(param, function (error,data) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(data)
                }
            });
        })
    },
    //验证存在与否
    isFind: function (param) {
        return new Promise(function (resolve, rejec) {
            var find = {'name': param.name};
                console.log(find)
            userModel.getOne({find:find}, function (error,data) {
                if (error) { //不存在返回false;
                    rejec(false)
                } else {
                    if(data){
                        console.log('找到',data)
                        resolve(true)//存在返回true;    
                    }else{
                         console.log('没有找到',data)
                        resolve(false)//不存在返回false;  
                    }
                    
                }
            });
        })
    },
    deleUser:function(param){
        return new Promise(function (resolve, rejec) {
            let obj = {'_id':param.id};
            userModel.del(obj, function (error,data) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(true)
                }
            });
        })
    },
    isFindById: function (param) {
        return new Promise(function (resolve, rejec) {
            var find = {'_id':param.id};
                //find.name = param.name;
                console.log(find)
            userModel.getById(param.id, function (error,data) {
                if (error) { //不存在返回false;
                    rejec(false)
                } else {
                    if(data){
                        console.log('找到id',data)
                        resolve(true)//存在返回true;    
                    }else{
                         console.log('找不到id',data)
                        resolve(false)//存在返回true;    
                    }
                    
                }
            });
        })
    },
    
    //获取所有用户
    getUser:function(param){
        if(!param) param = true
        return new Promise(function (resolve, rejec) {
            userModel.getList(param, function (error,value) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(value)//返回查询到的结果；
                }
            });
        })
    },
    //获取详情
    getOne:function(param){
        return new Promise(function (resolve, rejec) {
            var find = {'_id': param.id};
            userModel.getOne({find:find}, function (error,data) {
                if (error) { //不存在返回false;
                    rejec(false)
                } else {
                    if(data){
                        resolve(data);
                    }else{
                        resolve({msg:'无效参数'});
                    }
                    
                }
            });
        })
    }
}