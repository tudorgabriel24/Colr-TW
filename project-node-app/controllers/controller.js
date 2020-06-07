const http = require("http");
const url = require("url");


module.exports = http.createServer((req, res) => {
  var articleService = require("./articleService");
  var authService = require("./authService");
  const reqUrl = url.parse(req.url, true);

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

  // GET Endpoint
  if (reqUrl.pathname == "/sample" && req.method === "GET") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);

    articleService.sampleRequest(req, res);
  }
  //POST Endpoint
  else if (reqUrl.pathname == "/test" && req.method === "POST") {
    console.log("Request Type:" + req.method + "Endpoint: " + reqUrl.pathname);

    articleService.testRequest(req, res);
  } else {
    console.log(
      "Request Type:" + req.method + "Invalid Endpoint: " + reqUrl.pathname
    );

    articleService.invalidRequest(req, res);
  }
});
