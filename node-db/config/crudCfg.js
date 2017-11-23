//操作数据库模板

var fs = require('fs');

module.exports = function (dbName,callback) {
    let funObj = {};
    let fileArr = fs.readdirSync(__dirname.replace('config', 'model'));
    let error = 'Not_found :' + dbName + ',Should be in:';
    let modelArr = [];
    for (let i = 0; i < fileArr.length; i++) {
        let fileName = fileArr[i];
        fileName = fileName.split('.')[0];
        modelArr.push(fileName);
        if (dbName === fileName) {
            error = undefined;
        }
    }
    if (callback) {
        if (error) return callback(error + modelArr);
    }
    let model = require('../model/' + dbName);
    //增删改查
    funObj.add = function (data, cb) {
        
        (new model(data)).save(cb);
    };
    funObj.del = function (data, cb) {
        model
            .remove(data)
            .exec(cb);
    };
    funObj.edit = function (data, cb) {
        data.save(cb);
    };
    funObj.addList = function (data, cb) {
        model.create(data, cb);
    };
    funObj.getOne = function (data, cb) {
        model
            .findOne(data.find)
            .select(data.select || {})
            .exec(cb);
    };
    //扩展
    funObj.getCount = function (data, cb) {
        model
            .count(data)
            .exec(cb);
    };
    funObj.getById = function (data, cb) {
        model
            .findById(data.find)
            .select(data.select || {})
            .exec(cb);
    };
    funObj.getList = function (data, cb) {
        model
            .find(data.find)
            .select(data.select || {})
            .sort(data.sort || {})
            .skip(data.skip)
            .limit(data.limit)
            .exec(cb);
    };
    //批量更新
    funObj.update = function (data, cb) {
        model
            .update(data.find, data.set, data.multi || {multi: true})
            .exec(cb);
    };
    funObj.group = function (data, cb) {
        model
            .aggregate()
            .match(data.match)
            .group(data.group)
            .exec(cb);
    };
    return funObj;
};
