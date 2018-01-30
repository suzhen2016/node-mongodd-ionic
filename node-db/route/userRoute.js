const userSer = require('../service/userSer');
module.exports = function (app,express) {
    let router = express.Router();
    //添加用户的接口
    router.post('/addUser', function (req, res, next) {
        let param = req.body;
        //先查看是否有重复的数据
        userSer.isFind(param).then(function(data){
            if(data){
                let result = {
                    status: 'success',
                    data: {
                        isHas:data
                    }
                };
                res.json(result)
            }else{
                 //添加用户的接口；
                userSer.add(param).then(function (data) {
                    let result = {
                        status: 'success',
                        data: data
                    };
                    res.json(result)
                })
            }
             
        })
        
    });
    //获取用户信息
    router.post('/get_list', function (req, res, next) {
        let param = req.body;
        userSer.getUser(param).then(function(data){
            let result = {
                status: 'success',
                data: data
            };
            res.json(result)
             
        })
        
    });
    //删除某用户
    router.post('/dele_user', function (req, res, next) {
        let param = req.body;
        console.log('dis',param)
        userSer.deleUser(param).then(function(data){
            let result = {
                status: 'success',
                data: data
            };
            res.json(result)
        })
        
    });













    //测试
    router.get('/y', function (req, res, next) {
       res.json({status:'yes'})
    });

    return router;
};