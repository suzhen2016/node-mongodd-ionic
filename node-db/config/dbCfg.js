//链接数据库配置
module.exports= {
    mongodbUrl: 'mongodb://localhost:27017/xnjz',
    options:{
        poolSize: 10,//连接池
        useMongoClient: true
    }
}