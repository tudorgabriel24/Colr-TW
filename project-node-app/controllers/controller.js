const http = require("http");
const url = require("url");
var mysql = require("mysql");

module.exports = http.createServer((req, res) => {
  var service = require("./service");
  const reqUrl = url.parse(req.url, true);
  req.body = reqUrl.query;
  console.log(req.body.year);

  // if (req.method == 'GET') {
  //   var query = reqUrl.
  // }



  // Database connection

  // var connection = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "colr",
  //   charset: "utf8_general_ci",
  // });

  // connection.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");

  // });

  // GET Endpoint
  if (reqUrl.pathname == "/sample" && req.method === "GET") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);

    service.sampleRequest(req, res);
  }
  //POST Endpoint
  else if (reqUrl.pathname == "/test" && req.method === "POST") {
    console.log("Request Type:" + req.method + "Endpoint: " + reqUrl.pathname);

    service.testRequest(req, res);
  }
  
  else if (reqUrl.pathname == "/articles" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.getArticles(req, res);


  } else if (reqUrl.pathname == "/articles" && req.method == "POST") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.addArticles(req, res);
  }
    else if (reqUrl.pathname == "/articles" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.updateArticle(req, res);
    

  } else if (reqUrl.pathname == "/articles" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.deleteArticle(req, res);
    

  } else if (reqUrl.pathname == "/cart" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.getCart(req, res);
    

  } else if (reqUrl.pathname == "/cart" && req.method == "POST") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.addToCart(req, res);
    

  } else if (reqUrl.pathname == "/users" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.getUsers(req, res);
    

  } else if (reqUrl.pathname == "/users" && req.method == "POST") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.addUser(req, res);
    

  } else if (reqUrl.pathname == "/users" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.updateUser(req, res);
  } else if (reqUrl.pathname == "/users" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.deleteUser(req, res);
  } else {
    console.log(
      "Request Type:" + req.method + "Invalid Endpoint: " + reqUrl.pathname
    );
    service.invalidRequest(req, res);
  }


});
