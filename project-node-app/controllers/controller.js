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

    let brand = "Timisoreana"; // Trebuie sa fie schimbate pentru ceea ce va veni de pe front, o sa fie mai multe tipuri
    let id = "65";

    //INSERT

    // var insertion =
    //   "INSERT INTO articles(id, brand) VALUES ('" + id + "', '" + brand + "');";
    // connection.query(insertion, function (err, result) {
    //   if (err) throw err;
    //   console.log("Result: " + result);
    // });

    // SELECT
    var selection =
      "SELECT * FROM articles WHERE brand = " + mysql.escape(brand);
    connection.query(selection, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
      console.log("Number of records recieved: " + result.affectedRows);
    });

    // //DELETE

    // var deletion = "DELETE FROM articles WHERE brand = ?";
    // connection.query(deletion, [brand], function (err, result) {
    //   if (err) throw err;
    //   console.log("Result: " + result);
    //   console.log("Number of records recieved: " + result.affectedRows);
    // });

    //UPDATE
    var new_brand = "Cola";
    // var update_brand = [new_brand, brand];
    var update_data = "UPDATE articole SET brand = ? WHERE brand = ?;";
    connection.query(update_data, [new_brand, brand], function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
      console.log(result.affectedRows + " record(s) updated");
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
