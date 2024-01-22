const express = require('express');
const WebBoard  = require('../model/webBoard');
const router = express.Router();
const path = require('path');
const multer = require("multer");

//MULTER 사용
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null,'./uploads') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
   },
   filename: function (req, file, cb) {
     const ext = path.extname(file.originalname);
     cb(null,path.basename(file.originalname,ext) + "-" + Date.now() + ext); // cb 콜백함수를 통해 전송된 파일 이름 설정
   },
 })
const upload = multer({storage: storage})

router.get('/web', async (req, res) => {
    const list = await WebBoard.findAll({
        raw: true,
    })
    res.render('make_web',{list : list});
});
router.get('/app', (req, res) => {
    res.render('make_app');
});
router.get('/service', (req, res) => {
    res.render('make_service');
});
router.get('/upload', (req, res) => {
    res.render('make_upload');
});
router.post('/upload',upload.single('imgs'),async(req,res)=>{
    await WebBoard.create({
        username: "최건",
        useremail:"kyun0501",
        title: req.body.title,
        contents: req.body.contents,
        image: req.file.filename,
    });
    return res.redirect("/make/web")
})
router.get('/web/:id',async(req,res)=>{
    const id = req.params.id;
    const list = await WebBoard.findOne({
        where:{
            id
        },
        raw: true,
    })
    res.render('make_web_contents',{list : list});
})

module.exports = router;