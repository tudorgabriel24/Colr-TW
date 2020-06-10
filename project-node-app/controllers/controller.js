const http = require("http");
const url = require("url");
var mysql = require("mysql");
var formidable = require('formidable');
var util = require('util');
const { parse } = require('querystring');

module.exports = http.createServer((req, res) => {
  var service = require("./service");
  const reqUrl = url.parse(req.url, true);

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
    console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);
    let body = '';
    var form = new formidable.IncomingForm();

    // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.

    form.parse(req, function(err, fields, files) {
      if (err) {

        // Check for and handle any errors here.

        console.error(err.message);
        return;
      }
      req.body = fields;
      // console.log(files['image']);
      service.addArticle(req, res);
      // res.writeHead(200, {'content-type': 'application/json'});
      // res.write('received upload:\n\n');

      // // This last line responds to the form submission with a list of the parsed data and files.

      // res.end({fields: fields, files: files});
    });
    // req.on('data', chunk => {
    //     body += chunk.toString(); // convert Buffer to string
    //     req.body = parse(body);
    //     service.addArticle(req, res);
    // });
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
