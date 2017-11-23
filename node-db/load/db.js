// 操作数据库
const mongoose = require('mongoose');
const dbCfg = require('../config/dbCfg');
mongoose.connect(dbCfg.mongodbUrl,dbCfg.options);//连接数据库
const db = mongoose.connection;
mongoose.Promise = global.Promise;

module.exports = function(){
    db.on('connected',function() {
        console.log('MongoDB 连接成功');
    });
    db.on('error',function() {
        console.log('MongoDB 连接失败');
        db.close();
    });
    db.on('disconnected',function() {
        console.log('MongoDB 连接断开');
    });
    db.on('close',function() {
        console.log('MongoDB 连接关闭');
    });
};
