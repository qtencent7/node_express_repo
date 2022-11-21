const mysql = require('mysql');

const config = require('../MysqlConfig/index').db // 获取数据库配置信息

const connection = mysql.createConnection(config)

connection.connect(function (err) {
    if (err) {
        console.log("链接失败");
        throw (err)
    } else {
        console.log("mysql数据库链接成功");
    }
})

module.exports = connection