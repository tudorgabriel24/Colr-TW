const http = require("http");
const url = require("url");
<<<<<<< HEAD

=======
var mysql = require("mysql");
var formidable = require('formidable');
var util = require('util');
const { parse } = require('querystring');
const jwt = require('jsonwebtoken');
const { brotliDecompress } = require("zlib");
>>>>>>> 3ec8fe7cb547b4efc74e1922895023f360c131f7

module.exports = http.createServer((req, res) => {
  var articleService = require("./articleService");
  var authService = require("./authService");
  const reqUrl = url.parse(req.url, true);
  
  // console.log(req.method);
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Request-Method', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  // res.setHeader('Access-Control-Allow-Headers', '*');

<<<<<<< HEAD
  console.log("REQ AICI " + reqUrl.pathname);
  // Database connection

  //LOGIN REQUEST
  if(reqUrl.pathname == '/login' && req.method === "POST") {
    console.log('login request');
    authService.loginRequest(req, res);
  }
  else 
  //REGISTER REQUEST

  if(reqUrl.pathname == '/register' && req.method === "POST") {
    console.log('register request');
    authService.registerRequest(req,res);
  }
  else
=======
  const headers = {
    'Access-Control-Allow-Headers': '*', 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  if (req.method == "OPTIONS") {
    // for(var key in req) {
    //   console.log(key);
    // }
    res.writeHead(204, headers);
    res.end();
    return;
  }


  // const reqToken = req.headers.authorization;
  // // console.log(req);
  // try {
  //   var decoded = jwt.verify(reqToken, 'secret');
  //   req.session.id = decoded._id;
  // } catch(err) {
  //   console.log(err);
  //   response = {
  //     success: false,
  //     message: err
  //   };
  //   res.statusCode = 401;
  //   res.setHeader("Content-Type", "application/json");
  
  //   res.end(JSON.stringify(response));
  // }

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
>>>>>>> 3ec8fe7cb547b4efc74e1922895023f360c131f7

  // GET Endpoint
  if (reqUrl.pathname == "/sample" && req.method === "GET") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);

    articleService.sampleRequest(req, res);
  }
  //POST Endpoint
  else if (reqUrl.pathname == "/test" && req.method === "POST") {
    console.log("Request Type:" + req.method + "Endpoint: " + reqUrl.pathname);

<<<<<<< HEAD
    articleService.testRequest(req, res);
=======
    service.testRequest(req, res);
  }
  
  else if (reqUrl.pathname == "/articles" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.getArticles(req, res);


  } else if (reqUrl.pathname == "/articles" && req.method == "POST") {
    console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        // body = body.split(`,"image":"`);
        // console.log(body[0] + '}');
        req.body = body;

        
        // req.param = body[1].substring(0, body[1].length - 2);
        // console.log(req.body);
        service.addArticle(req, res);
    });
  }
    else if (reqUrl.pathname == "/articles" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        req.body = JSON.parse(body);
        console.log(req.body);
        service.updateArticle(req, res);
    });
    

  } else if (reqUrl.pathname == "/articles" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        req.body = JSON.parse(body);
        console.log(req.body);
        service.deleteArticle(req, res);
    });
    

  } else if (reqUrl.pathname == "/cart" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.getCart(req, res);
    

  } else if (reqUrl.pathname == "/cart" && req.method == "POST") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        req.body = JSON.parse(body);
        console.log(req.body);
        service.addToCart(req, res);
    });
    

  } else if (reqUrl.pathname == "/users" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.getUsers(req, res);
    

  } else if (reqUrl.pathname == "/users" && req.method == "POST") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        req.body = JSON.parse(body);
        console.log(req.body);
        service.addUser(req, res);
    });
    

  } else if (reqUrl.pathname == "/users" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
        req.body = JSON.parse(body);
        console.log(req.body);
        service.updateUser(req, res);
    });

  } else if (reqUrl.pathname == "/users" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.deleteUser(req, res);

>>>>>>> 3ec8fe7cb547b4efc74e1922895023f360c131f7
  } else {
    console.log(
      "Request Type:" + req.method + " Invalid Endpoint: " + reqUrl.pathname
    );
<<<<<<< HEAD

    articleService.invalidRequest(req, res);
  }
=======
    service.invalidRequest(req, res);

  } 
>>>>>>> 3ec8fe7cb547b4efc74e1922895023f360c131f7
});
