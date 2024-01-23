const express = require('express');
const SoomgoWeb  = require('../model/soomgoWeb');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null,'./uploads') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
   },
   filename: function (req, file, cb) {
     const ext = path.extname(file.originalname);
     cb(null,path.basename(file.originalname,ext) + "-" + Date.now() + ext); // cb 콜백함수를 통해 전송된 파일 이름 설정
   },
 })
const upload = multer({storage: storage});

router.get('/web',async(req,res)=>{
    const list = await SoomgoWeb.findAll({
        raw:true,
    })
    res.render('soomgo_web',{list:list});
});
router.get('/app',(req,res)=>{
    res.render('soomgo_app');
});
router.get('/service',(req,res)=>{
    res.render('soomgo_service');
});
router.get('/upload',(req,res)=>{
    res.render('soomgo_upload');
});
router.post('/upload',upload.fields([{ name: 'imgs' }, { name: 'imgs2' }]),async(req,res)=>{
    await SoomgoWeb.create({
        useremail: "kyun0501",
        username: "최건",
        image: (req.files['imgs'])[0].filename,
        image2: (req.files['imgs2'])[0].filename,
        field: req.body.field,
        statusf:'찾는 중',
        language: req.body.language,
    })
    return res.redirect("/soomgo/web")
})
module.exports = router;