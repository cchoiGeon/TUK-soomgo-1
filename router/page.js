const express = require('express');
const { islogin } = require('../middleware');
const router = express.Router();

router.get('/',islogin,(req, res) => {
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', (req, res) => {
    req.session.login = true;
    return res.redirect("/")
});
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/myprofile', (req, res) => {
    res.render('myprofile');
});

module.exports = router;