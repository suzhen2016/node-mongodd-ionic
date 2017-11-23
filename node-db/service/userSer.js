
let userModel = require('../config/crudCfg')('user');//获得数据操作的方法
module.exports = {
    
    //添加用户
    add: function (param) {
        return new Promise(function (resolve, rejec) {
            userModel.add(param, function (error) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(true)
                }
            });
        })
    },
     isFind: function (param) {
        return new Promise(function (resolve, rejec) {
            userModel.getOne(param, function (error) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(true)
                }
            });
        })
    }
}