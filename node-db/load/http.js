const fs = require('fs'), express = require('express'), body_parser = require('body-parser');

module.exports = function () {
    let app = express();

    //跨域处理
    app.all("*", function (req, res, next) {
      
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept, x-access-token, version");
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
       
        next();
    });

    //解析客户端传参
    app.use(body_parser.urlencoded({extended: true}));
    app.use(body_parser.json());

    //加载所有路由
    let routePath=__dirname.replace('load', 'route')
    let fileArr = fs.readdirSync(routePath)
    for (let i = 0; i < fileArr.length; i++){
        let fileName = fileArr[i].split('.')[0];
        let route = require('../route/' + fileName)(app,express);
        app.use(route)
    }
    console.log(body_parser.json())
    app.get('/add',function(req, res){
        res.send({status: '访问成功'});
    })
    //无匹配路由回错误状态
    app.use('*', function (req, res) {
        res.send({status: 'url_not_found'});
    });

    //监听端口
    app.listen(global.port, function (err) {
        let str=`服务启动成功，端口号${global.port}`;
        if (err) { str=`服务启动失败，端口号${global.port},失败原因：${err}`};
        console.log(str)
    });
};