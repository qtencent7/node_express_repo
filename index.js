const express = require('express');
const path = require("path");
var bodyParser = require('body-parser')
const fileRouter = require("./router/file");
const listRouter = require("./router/list");
const UserRouter = require("./router/user");
const downloadRouter = require("./router/download");
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/file', fileRouter)
app.use('/list', listRouter)
app.use('/user', UserRouter)
app.use('/download', downloadRouter)

app.get('/auth', function(req, res, next) {
    res.render('auth', { title: 'Express' });
});
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
app.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'Express' });
});

module.exports = app;

