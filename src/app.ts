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
import { getAllUser } from "./data/models/user";
import {getAllArticle}  from "./data/models/article";
import schema from './data/schema';
import jwt from 'express-jwt'
import multiparty from 'multiparty'
import path from 'path'
import uuid from 'uuid'
// import { socket } from "./socket/index";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import { rankAll } from './route/initData';
// import article from 'data/mutation/article';
var proxy = require('http-proxy-middleware');
const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Controllers (route handlers)


// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDBi

//config 

const mongoUrl = MONGODB_URI;

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});
app.set("port", process.env.PORT || 4000);
console.log('OK  ',path.resolve('./img'))
app.use('/img',express.static(path.resolve('./img')));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true
  })
}))


app.get('/getAllArticle/:id', async (req, res) => {
  // console.log(req.params)
  const { id } = req.params as any
  // console.log('id', id)
  const data = await getAllArticle(id)
  // console.log('data All article', data)
})
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
app.get('/test', (req, res) => {
  console.log(req.body)
  res.send('OK')
})
rankAll(5)
// console.log(getAllUser())
// app.use(authMiddleware)
app.use((req, res, next) => {
  // console.log(req.user)
  next()
})
const authExamle = (req, res, next) => {
  next()
}
app.get('/rank', async (req, res) => { 
console.log(rankAll(5))
const data = await rankAll(5)
  res.send(data)
})

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

export default app;