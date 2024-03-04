const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const path = require('path');
const redis = require('redis');
const RedisStore = require('connect-redis')(session)
// 버전 6.1.3에서는 session 함수가 사용 가능한데 7.0.0 이후부턴 코드가 바뀐 듯 알아봐야 될 듯
const redisClient = redis.createClient({
  url: 'redis://redis-12326.c256.us-east-1-2.ec2.cloud.redislabs.com:12326',
  password: 'W8FiCljwvwJu3MPL1b9ZVDD80F7LUgcY',
  legacyMode:true,
})
redisClient.connect().catch(console.error)

const sessionOption = {
  secret: 'process.env.COOKIE_SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly : true,
    secure : false,
  },
  store: new RedisStore({client: redisClient}),
}

const { sequelize } = require('./model/index');

sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))

app.set('view engine', 'ejs');
app.set('html',require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.use(session(sessionOption));
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