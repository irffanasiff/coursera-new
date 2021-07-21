const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { equal } = require("assert");

const hostname = "localhost";
const port = 8000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json()); //this allows us to parse the body of the request message which is formatted in json format

app.all("/dishes", (req, res, next) => {
  //this will be done for all the requests get put post or dlt
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  next();
});
app.get("/dishes", (req, res, next) => {
  res.end("will send all the dishes to you");
});
app.post("/dishes", (req, res, next) => {
  res.end(
    "will add the dish: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});
app.put("/dishes", (req, res, next) => {
  res.end("PUT operation not supported on dishes");
});
app.delete("/dishes", (req, res, next) => {
  res.end("deleting all the dishes");
});
app.get("/dishes/:dishId", (req, res, next) => {
  res.end("will send details of the dish: " + req.params.dishId + " to you!");
});
app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end("Post operation not supported on /dishes/" + req.params.dishId);
});
app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n");
  res.end(
    "will update the dish: " +
      req.body.name +
      " with details " +
      req.body.description
  );
});
app.delete("/dishes/:dishId", (req, res, next) => {
  res.end("deleting dish "+req.params.dishId);
});

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");
  res.end("<html><body><h1>This is a express server </h1></body></html>");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
