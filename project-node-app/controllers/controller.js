const http = require("http");
const url = require("url");
var mysql = require("mysql");

module.exports = http.createServer((req, res) => {
  var service = require("./service");
  const reqUrl = url.parse(req.url, true);

  // Database connection

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "colr",
    charset: "utf8_general_ci",
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    insertion =
      "INSERT INTO articles(id, brand, year, name) VALUES ( '30', 'Timisoreana', '2008','Beer Bottle')";

    connection.query(insertion, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });

  // GET Endpoint
  if (reqUrl.pathname == "/sample" && req.method === "GET") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);

    service.sampleRequest(req, res);
  }
  //POST Endpoint
  else if (reqUrl.pathname == "/test" && req.method === "POST") {
    console.log("Request Type:" + req.method + "Endpoint: " + reqUrl.pathname);

    service.testRequest(req, res);
  } else {
    console.log(
      "Request Type:" + req.method + "Invalid Endpoint: " + reqUrl.pathname
    );

    service.invalidRequest(req, res);
  }
});
