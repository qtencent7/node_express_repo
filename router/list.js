const express = require('express');
const connection = require("../mysql/index");

const router = express.Router();

router.get('/users', function(req, res, next) {
  connection.query('select * from user', (err, users) => {
      if (err) {
        res.send('query error')
      } else {
        // 将 MySQL 查询结果作为路由返回值
        res.send(users)
      }
  })
});
router.get('/books', function(req, res, next) {
    connection.query('select * from book', (err, books) => {
        if (err) {
          res.send('query error')
        } else {
          // 将 MySQL 查询结果作为路由返回值
          res.send(books)
        }
    })
});
router.get('/info', function(req, res, next) {
  connection.query('select * from user where id=1 limit 1', (err, info) => {
      if (err) {
        res.send('query error')
      } else {
        // 将 MySQL 查询结果作为路由返回值
        res.send(info)
      }
  })
});
module.exports = router;