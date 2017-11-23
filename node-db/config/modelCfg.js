//创建模型配置
module.exports={
    creatModel:function (model,attr) {
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        const modelSchema = new Schema(attr);
        return mongoose.model(model, modelSchema,model);
    }
}