const express = require('express');
const formidable = require('formidable');
const fs = require("fs");

const UPLOAD_PATH = 'uploads'

const router = express.Router();


router.post('/upload', function (req, res, next) {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
        fs.readFile(files.file.filepath, function (err, data) {

            fs.writeFile(`${UPLOAD_PATH}/${files.file.originalFilename}`, data, function (err) {
                if (err) res.json({ err })
                res.json({
                    msg: '上传成功'
                });
            });
        })
    });
})
router.post('/uploadbatch', function (req, res, next) {
    const form = formidable({ multiples: true })
    let filename = ""
    let hash = ""
    form.parse(req, (err, fields, files) => {
        filename = fields.filename
        hash = fields.hash
        const dir = `${UPLOAD_PATH}/${filename}`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        const buffer = fs.readFileSync(files.chunk.filepath);
        const ws = fs.createWriteStream(`${dir}/${hash}`);
        ws.write(buffer);
        ws.close();
        res.json({
            msg: '上传成功'
        });
    });
})
router.get('/merge', function (req, res, next) {
    let { filename } = req.query
    let len = 0;
    const bufferList = fs.readdirSync(`${UPLOAD_PATH}/${filename}`).map(hash => {
        const buffer = fs.readFileSync(`${UPLOAD_PATH}/${filename}/${hash}`);
        len += buffer.length;
        return buffer;
    });
    const buffer = Buffer.concat(bufferList, len);
    filename = filename.slice(-30);
    const ws = fs.createWriteStream(`${UPLOAD_PATH}/${filename}`);
    ws.write(buffer);
    ws.close();
    res.send({ msg: "合并请求成功" })
})
module.exports = router;