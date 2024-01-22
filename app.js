const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const { sequelize } = require('./model/index');

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))

app.set('view engine', 'ejs');
app.set('html',require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());


app.use('/make',express.static(path.join(__dirname, 'static')));
app.use('/make/web',express.static(path.join(__dirname, 'static')));
app.use('/soomgo',express.static(path.join(__dirname, 'static')));

const pageRouter = require('./router/page');
const makeRouter = require('./router/make');
const soomgoRouter = require('./router/soomgo');

app.use('/',pageRouter)
app.use('/make',makeRouter)
app.use('/soomgo',soomgoRouter)

app.listen(3000)