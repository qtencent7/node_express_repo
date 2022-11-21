const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/video', function (req, res, next) {
    res.download(path.join(__dirname , '..' , 'uploads', '下载.png')) 
})

module.exports = router;