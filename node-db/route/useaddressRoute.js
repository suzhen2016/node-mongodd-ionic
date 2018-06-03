const userSer = require('../service/useAddress');
module.exports = function (app,express) {
    let router = express.Router();
    //添加用户地址的接口
    router.post('/add_addr', function (req, res, next) {
        let param = req.body;
                 //添加用户的接口；
                userSer.add(param).then(function (data) {
                    let result = {
                        status: 'success',
                        data: data
                    };
                    res.json(result)
                })
    });
    //查询用户的地址信息数组
    router.post('/get_addrss_list',function(req,res,next){
        let param = req.body;
        userSer.getList(param).then(function(data){
            if(data){
                let result = {
                    status:'success',
                    data:data
                }
                res.json(result)
            }
        })
    })
    //修改地址
    router.post('/change_address',function(req,res,next){
        let param = req.body;
        userSer.changeAddr(param).then(function(data){
            if(data){
                let result = {
                    status:'success',
                    data:data
                }
                res.json(result)
            }    
        })
    })
    //删除地址
    router.post('/dele_address',function(req,res,next){
        let param = req.body;
        userSer.deleAddr(param).then(function(data){
            if(data){
                let result = {
                    status:'success',
                    data:data
                }
                res.json(result)
            }    
        })
    })
    return router;
};