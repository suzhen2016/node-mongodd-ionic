
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
            console.log(param)
            userModel.getOne(param, function (error,data) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(data)
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