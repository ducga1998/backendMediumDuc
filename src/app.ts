import  fs  from 'fs';
import bluebird from "bluebird";
import bodyParser from "body-parser";
import compression from "compression"; // compresses requests
import mongo from "connect-mongo";
import dotenv from "dotenv";
import express from "express";
import expressGraphQL from 'express-graphql';
import session from "express-session";
import expressValidator from "express-validator";
import mongoose from "mongoose";
import schema from './data/schema';
import  graph from 'fbgraph';
import jwt from 'express-jwt'
import multiparty from 'multiparty'
import path from 'path'
import uuid from 'uuid'
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { rankAll } from './route/initData';
import { getHashTagAll } from './data/models/hashtag';
const MongoStore = mongo(session);
dotenv.config({ path: ".env" });
import * as passportConfig from "./config/passport";
import passport from 'passport' 
const app = express();
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});
app.use(passport.initialize());
app.use(passport.session());
app.set("port", process.env.PORT || 4000);
app.use('/img',express.static(path.resolve('./img')));
// app.use('/',express.static(path.resolve('./dist/build')));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true
  })
}))
app.post('/img' , (req, res ) => {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
  const {path , originalFilename} = files.image[0]
  fs.readFile(path ,  (err  , content) => {
    if(err){
      console.log(err)
      return
    }
  const name = uuid()
  fs.writeFile('img/'+name, content , (err ) =>{
    if(err){
      console.log(err)
    }
    res.send({name})
 })
 })
    })
})
rankAll(5)
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user
    && req.path !== '/login'
    && req.path !== '/signup'
    && !req.path.match(/^\/auth/)
    && !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user
    && (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
app.get('/api/rank', async (req, res) => { 
const data = await rankAll(5)
  res.send(data)
})
app.get('/api/hashtag' , async (req, res) => {
  const { name } = req.params as any
  const hasgtag = await getHashTagAll()
  console.log('hasgtag',hasgtag)
  res.send(hasgtag)
})
const getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, profile) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile
    });
  });
};
app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, getFacebook);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {  

  console.log('redirect call back ',)
  res.redirect(req.session.returnTo || '/');
});

app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, (req , res  , callack ) => {
  console.log('call back request ===== > ' , req.session )
});
app.get('/auth/github', passport.authenticate('github') , (req , res) => {
  console.log(req.session)
});
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  console.log('req session' , req.session)
  res.redirect('/');
});
app.use(
  '/graphql',
  bodyParser.json({ limit: '1024kb' }),
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
    pretty: true,
  }))
)
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

export default app;