var modelCfg=require('../config/modelCfg');
module.exports=modelCfg.creatModel('address',{
    user_id: {type: String, required: true},  
    name: {type: String, required: true},
    phone:{type: Number, required: true},
    // city: {type: String, required: true},
    // province:{type:String,require:true},
    district:{type:String,require:true},
    is_default:{type:Boolean,default:false},
    time_creation: {
        type: Date, required: true, default: function () {
            return new Date();
        }
    }    
});

/*var mongoose = require('mongoose');                        创建model的模型
var Schema = mongoose.Schema;

var ProductClassifySchema = new Schema({
    PID: {type: String, required: true},                         // 父节点
    chn: {type: String, required: true},                         // 中文
    lev: {type: Number, default: 0},                             // 层级数
    CID: {type: String, default: ''},                            // 父节点
    file: {type: String}
});

module.exports = mongoose.model('classify', ProductClassifySchema);*/