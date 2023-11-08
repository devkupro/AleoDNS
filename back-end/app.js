var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");
var cors = require("cors");

var app = express();

// enable CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// open port 8000
app.listen(8000, () => {
  console.log("Server started!");
});

module.exports = app;
