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
import { getAllArticle } from "./data/models/user";
import schema from './data/schema';
import jwt from 'express-jwt'
// import { socket } from "./socket/index";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
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

app.get('/test', (req, res) => {
  res.send('OK')
})
const middware = (req, res, next) => {
  console.log(req.session.pass)
}
const authMiddleware = jwt({
  secret: 'somesuperdupersecret'
})
// app.use(authMiddleware)
app.use((req, res, next) => {
  // console.log(req.user)
  next()
})
const authExamle = (req, res, next) => {
  next()
}
app.get('/api', (req, res) => {

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