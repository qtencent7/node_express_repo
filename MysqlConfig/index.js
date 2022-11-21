module.exports = {
    port: 3000, // express 服务启动端口
    db: {
      host: 'localhost', // 主机名
      port: 3306,        // MySQL 默认端口为 3306
      user: 'root',          // 使用 root 用户登入 MySQL
      password: '', // MySQL 密码，用你自己的
      database: 'express_mysql_db' // 使用数据库
    }
  }
  