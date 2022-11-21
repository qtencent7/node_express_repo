const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require("../mysql/index");

const jwtKey = 'mytokenkey';

const router = express.Router();

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
router.post('/register', (req, res) => {
  let { username, password } = req.body;
  connection.query(`INSERT INTO test_user (username, password)
  SELECT * FROM (SELECT '${username}', '${password}') AS tmp
  WHERE NOT EXISTS (
      SELECT username FROM test_user WHERE username = '${username}'
  )`, (err, info) => {
    if (err) {
      res.send(err)
    } else {
      // 将 MySQL 查询结果作为路由返回值
      if (info.affectedRows > 0) {
        res.send("注册成功！")
      } else {
        res.send("用户已存在")
      }
    }
  })
})
router.post("/login",(req,res)=>{
  //获取用户名和密码
  let {username,password} = req.body;
  console.log(req.body)
  //查询数据库
  let sql = `select * from test_user where username = '${username}' and password = '${password}'`;
  connection.query(sql,(err, info) => {
    if (err) {
      res.send(err)
    } else {
      if(info.length > 0) {
        const token = jwt.sign({user: info}, jwtKey, {expiresIn: '1h'})
        res.send(token)
      } else {
        res.send("此用户不存在")
      }

    }
  })
})
router.get("/testtoken",(req,res, next)=>{
  const token = req.headers['token']
  jwt.verify(token, jwtKey, (err, data) => {
    if (err) {
      res.send({
        code: '999999',
        msg: 'token无效'
      })
    } else {
      req.jwtInfo = data
      next()
    }
  })
},(req,res)=>{
  res.send("final result")
})
module.exports = router;