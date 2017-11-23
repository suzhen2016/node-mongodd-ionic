const userSer = require('../service/userSer');
module.exports = function (app,express) {
    let router = express.Router();
   
    router.post('/addUser', function (req, res, next) {
        let param = req.body;
        //先查看是否有重复的数据
        userSer.isFind(param.name).then(function(data){
             let result = {
                status: 'success',
                data: {
                    isHas:data
                }
            };
            res.json(result)
        })
        return false;
         //添加用户的接口；
        userSer.add(param).then(function (data) {
            let result = {
                status: true,
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