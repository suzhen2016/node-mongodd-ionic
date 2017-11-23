const blogSer = require('../service/blogSer');
module.exports = function (app,express) {
    let router = express.Router();
    router.get('/getListBlog', function (req, res, next) {
        blogSer.getListBlog().then(function (data) {
            let result = {
                status: true,
                data: data
            };
            res.json(result)
        })
    });
    router.post('/addBlog', function (req, res, next) {
        let param = req.body;
        //添加blog的接口；
        blogSer.addBlog(param).then(function (data) {
            let result = {
                status: true,
                data: data
            };
            res.json(result)
        })
    });
    return router;
};