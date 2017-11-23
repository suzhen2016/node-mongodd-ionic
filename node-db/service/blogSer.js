
let addressModel = require('../config/crudCfg')('address');//获得数据操作的方法
module.exports = {
    getListBlog: function () {
        return new Promise(function (resolve, rejec) {
            addressModel.getList({}, function (err, data) {
                if (err) {
                    rejec(err)
                } else {
                    resolve(data)
                }
            });
        })
    },
    //添加地址的服务，处理业务
    addBlog: function (param) {
        return new Promise(function (resolve, rejec) {
            addressModel.add(param, function (error) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(true)
                }
            });
        })
    }
}