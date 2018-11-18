import errorHandler from "errorhandler";
import app from "./app";


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

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

export default server;
