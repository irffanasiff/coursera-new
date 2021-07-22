const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require('./routes/dishRouters');



const hostname = "localhost";
const port = 8000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json()); //this allows us to parse the body of the request message which is formatted in json format

app.use('/dishes', dishRouter);
app.use('/dishes/:disheId', dishRouter);


const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
