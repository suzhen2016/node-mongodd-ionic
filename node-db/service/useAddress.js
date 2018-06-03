
let addressModel = require('../config/crudCfg')('address');//获得数据操作的方法
module.exports = {
    //添加地址
    add: function (param) {
        return new Promise(function (resolve, rejec) {
            addressModel.add(param, function (error,data) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(data)
                }
            });
        })
    },
    //获取用户所有的地址信息
    getList:function(param){
        let find = {find:param}
        return new Promise(function (resolve, rejec) {
            addressModel.getList(find, function (error,value) {
                if (error) {
                    rejec(false)
                } else {
                    resolve(value)//返回查询到的结果；
                }
            });
        })
    },
    //获取详情
    changeAddr:function(param){ 
        let params = param;
        return new Promise(function(resolve,rejec){
           
            addressModel.getOne({find:{user_id:params.user_id,_id:params.id}},function(err,value){
                console.log('检查结构',params,value)
                if(err){
                    resolve(false)
                }else{
                    if(value){
                        resolve(value)
                    }else{
                         resolve({noHas:true})
                    }
                }
            })
        }).then(function(data){
                if(data){
                    if(data.noHas){
                        return {
                            msg:'你要修改的地址不存在',
                            noHas:true
                        }
                    }else{
                        let findObj = data;
                        for(let A in params){
                            if(params[A] && A!='user_id' && A!='_id'){
                                findObj[A] = params[A];
                            }
                        }
                        return new Promise(function(resolve,reject){
                            addressModel.edit(findObj,function(err,value){
                                if(err){
                                    resolve(false)
                                }else{
                                    if(value){
                                        resolve(value)
                                    }
                                }
                            })
                        }) 
                    }
                       
                }
            })
    },
    //删除地址
    deleAddr:function(param){
        let params = param;
    //     return new Promise(function(resolve,rejec){
    //         addressModel.getOne({find:{user_id:params.user_id,_id:params._id}},function(err,value){
    //             if(err){
    //                 resolve(false)
    //             }else{
    //                 if(value){
    //                     resolve(value)
    //                 }else{
    //                      resolve({noHas:true})
    //                 }
    //             }
    //         })
    //     }).then(function(data){
    //             if(data){
    //                 if(data.noHas){
    //                     return {
    //                         msg:'你要删除的地址不存在',
    //                         noHas:true
    //                     }
    //                 }else{
    //                     let findObj = data;
    //                     return new Promise(function(resolve,reject){
    //                         addressModel.del(findObj,function(err,value){
    //                             if(err){
    //                                 resolve(false)
    //                             }else{
    //                                 if(value){
    //                                     resolve({id:findObj._id})
    //                                 }
    //                             }
    //                         })
    //                     }) 
    //                 }
                       
    //             }
    //         })
    return new Promise(function(resolve,reject){
                            addressModel.del(params,function(err,value){
                                if(err){
                                    resolve(false)
                                }else{
                                    if(value){
                                        resolve({id:params._id})
                                    }
                                }
                            })
                        }) 
    }
}