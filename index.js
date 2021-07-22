const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const promoRouter = require('./routes/promoRouters');
const url = require('url')
const dishRouter = require('./routes/dishRouters');


const dishRouter = require('./routes/leaderRouter');
const leaderRouter = require("./routes/leaderRouter");



const hostname = "localhost";
const port = 8000;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json()); //this allows us to parse the body of the request message which is formatted in json format


app.use('/dishes', dishRouter);
app.use('/dishes/:disheId', dishRouter);
app.use('/promotions', promoRouter);
app.use('/promotions/:promotionId', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leadersId', leaderRouter);

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
