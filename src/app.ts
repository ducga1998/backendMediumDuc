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

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 4000);
// app.set("views", path.join(__dirname, "../views"));
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
// app.use('/graphql', proxy({ target: 'http://google.com', changeOrigin: true }));
app.use(
  '/graphql',
  bodyParser.json({ limit: '1024kb' }),
  expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
    pretty: true
  }))
)

// app.use(
//   express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
// );

/**
 * Primary app routes.
 */


export default app;