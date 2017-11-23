require('./load/common');
require('./load/db')();//链接数据库
require('./load/http')();//创建应用（路由等）
