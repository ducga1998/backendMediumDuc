import errorHandler from "errorhandler";
import app from "./app";

import { startIo } from './socket/index'
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
var http = require('http').Server(app);

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "Product desgin by Nguyen Minh  Duc , github : github.com/ducga1998",
    app.get("port"),
    app.get("env")
  );
  console.log(":) backend run success  \n");
});
startIo(server);

export default server;
