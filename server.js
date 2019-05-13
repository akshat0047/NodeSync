var express = require("express");
var myParser = require("body-parser");
var app = express();
var cors = require("cors");
var fs = require("fs");
const request = require("request");
var i = 0;

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json());
app.use(cors());

app.post("/server", function(request, response) {
  console.log(request.body);
  i++;
  fs.writeFile(
    "./dataClient/client" + i + ".json",
    JSON.stringify(request.body),
    () => {
      console.log("client file");
    }
  );
  makeRequest(request.body);
});

function makeRequest(d) {
  request.get(
    "http://localhost:4000/serverone",
    { json: d },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log("sent");
      console.log(body.url);
      console.log(body.explanation);
    }
  );
}

app.get("/serverone", function(request, response) {
  fs.writeFile(
    "./dataServer/server" + i + ".json",
    JSON.stringify(request.body),
    () => {
      console.log("server file");
    }
  );
});

app.listen(4000);
