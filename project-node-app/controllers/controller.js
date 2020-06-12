const http = require("http");
const url = require("url");
const service = require("./service");

var mysql = require("mysql");
var formidable = require("formidable");
var util = require("util");
const { parse } = require("querystring");
const jwt = require("jsonwebtoken");
const { brotliDecompress } = require("zlib");

module.exports = http.createServer((req, res) => {
  var articleService = require("./articleService");
  var authService = require("./authService");
  const reqUrl = url.parse(req.url, true);

  // console.log(req.method);
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Request-Method', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  // res.setHeader('Access-Control-Allow-Headers', '*');

  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Max-Age": 2592000,
    // "Access-Control-Expose-Headers": "Authorization",
    /** add other headers as per requirement */
  };

  if (req.method == "OPTIONS") {
    // for(var key in req) {
    //   console.log(key);
    // }
    res.writeHead(204, headers);
    res.end();
    return;
  } else if (reqUrl.pathname == "/login" && req.method === "POST") {
    console.log("login request");
    authService.loginRequest(req, res, headers);
  } else if (reqUrl.pathname == "/register" && req.method === "POST") {
    console.log("register request");
    authService.registerRequest(req, res, headers);
  } else if (reqUrl.pathname == "/articles" && req.method == "GET") {
    console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);
    service.getArticles(req, res);

  } else if (reqUrl.pathname == "/articles" && req.method == "POST") {
    console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);
    new formidable.IncomingForm().parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
      }
      console.log('ddd');
      req.body = fields;
      console.log('dddd');
      service.addArticle(req, res, files);
    });
  } else if (reqUrl.pathname == "/articles" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
      req.body = JSON.parse(body);
      console.log(req.body);
      service.updateArticle(req, res);
    });
  } else if (reqUrl.pathname == "/articles" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = "";
    req.on("data", (chunk) => {
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
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
      req.body = JSON.parse(body);
      console.log(req.body);
      service.addToCart(req, res);
    });
  } else if (reqUrl.pathname == "/users" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
      req.body = JSON.parse(body);
      console.log(req.body);
      service.updateUser(req, res);
    });
  } else if (reqUrl.pathname == "/users" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    service.deleteUser(req, res);
  } else {
    console.log(
      "Request Type:" + req.method + " Invalid Endpoint: " + reqUrl.pathname
    );
    service.invalidRequest(req, res);
  }
});
