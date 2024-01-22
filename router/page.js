const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/myprofile', (req, res) => {
    res.render('myprofile');
});

module.exports = router;