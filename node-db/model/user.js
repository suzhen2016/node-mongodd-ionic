var modelCfg=require('../config/modelCfg');
module.exports=modelCfg.creatModel('userModel',{
    name: String,
    password: String
});