
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
                //find.name = param.name;
                console.log(find)
            userModel.getOne(find, function (error,data) {
                if (error) { //不存在返回false;
                    rejec(false)
                } else {
                    if(data){
                        console.log('找到',data)
                        resolve(true)//存在返回true;    
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
    }
}