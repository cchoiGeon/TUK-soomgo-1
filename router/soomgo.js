const express = require('express');
const router = express.Router();

router.get('/web',(req,res)=>{
    res.render('soomgo_web');
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

module.exports = router;