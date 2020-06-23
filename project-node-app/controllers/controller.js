const http = require("http");
const url = require("url");

var formidable = require("formidable");
var utils = require("../../util.js");

module.exports = http.createServer((req, res) => {
  const authService = require("./authService");
  const adminService = require("./adminService");
  const service = require("./service");
  const reqUrl = url.parse(req.url, true);
  const rssCreator = require("./rssCreator");

  var path = reqUrl.pathname.split("/");

  console.log(`Request Type: ${req.method} Endpoint: ${reqUrl.pathname}`);

  const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, DELETE",
    "Access-Control-Max-Age": 2592000,
    "Access-Control-Expose-Headers": "Authorization",
    /** add other headers as per requirement */
  };

  if (req.method == "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  } else if (reqUrl.pathname == "/login" && req.method === "POST") {
    console.log("login request");
    authService.loginRequest(req, res, headers);
  } else if (reqUrl.pathname == "/register" && req.method === "POST") {
    console.log("register request");
    authService.registerRequest(req, res, headers);
  } else if (reqUrl.pathname == "/" && req.method === "GET") {
    res.end("asddd");
  } else if (reqUrl.pathname == "/articles" && req.method == "GET") {
    if (reqUrl.query.email) {
      console.log("get articles query email");
      adminService.getUserArticles(req, res, headers);
    } else {
      req.body = JSON.parse(JSON.stringify(reqUrl.query));
      service.getArticles(req, res);
    }
  } else if (reqUrl.pathname == "/articles" && req.method == "POST") {
    console.log("Se asteapta formularul");
    new formidable.IncomingForm().parse(req, function (err, fields, files) {
      if (err) {
        console.log(err);
        utils.writeJson({ code: 402, description: err });
      }
      console.log("Nici o eroare");
      req.body = fields;
      req.body.imagePath = files.image.path;
      console.log(req.body);
      console.log("Se apeleaza");
      service.addArticle(req, res);
    });
  } else if (reqUrl.pathname == "/articles" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    adminService.updateArticle(req, res, headers);
    // let body = "";
    // req.on("data", (chunk) => {
    //   body += chunk.toString(); // convert Buffer to string
    //   req.body = JSON.parse(body);
    //   console.log(req.body);
    //   service.updateArticle(req, res);
    // });
  } else if (reqUrl.pathname == "/articles" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    adminService.deleteUserArticles(req, res, headers);
    // let body = "";
    // req.on("data", (chunk) => {
    //   body += chunk.toString(); // convert Buffer to string
    //   req.body = JSON.parse(body);
    //   console.log(req.body);
    //   service.deleteArticle(req, res);
    // });
  } else if (reqUrl.pathname == "/users" && req.method == "PUT") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
      req.body = JSON.parse(body);
      console.log(req.body);
      service.updateUser(req, res);
    });
  } else if (reqUrl.pathname == "/rss" && req.method == "GET") {
    service
      .getHottest()
      .then((response) => {
        const title = [response[0].name, response[1].name, response[2].name];
        const description = [
          response[0].description,
          response[1].description,
          response[2].description,
        ];
        const link = ["link1", "link2", "link3"];
        console.log(title);
        // utils.writeJson(res, response);
        rssCreator.getRss(title, link, description, res);
        utils.writeJson(res, { code: 200, description: "success" });
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
  } else if (path[1] == "stats" && req.method == "GET") {
    console.log("dam stats");
    var my_list = [];
    for (i = 2; i < path.length; i = i + 1) {
      my_list.push(path[i]);
    }
    my_list = my_list.join(",");
    console.log(my_list);
    service
      .getStats(my_list, reqUrl.query.order)
      .then((response) => {
        utils.writeJson(res, response);
      })
      .catch((response) => {
        utils.writeJson(res, response);
      });
    return;
  } else if (reqUrl.pathname == "/users" && req.method == "GET") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    adminService.getUsers(req, res, headers);
  } else if (reqUrl.pathname == "/users" && req.method == "PUT") {
  } else if (reqUrl.pathname == "/users" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    adminService.deleteUser(req, res, headers);
  } else if (reqUrl.pathname == "/cart" && req.method == "DELETE") {
    console.log(`Request Type: ${req.method} \nEndpoint: ${reqUrl.pathname}`);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
      req.body = JSON.parse(body);
      console.log(req.body);
      service.deleteFromCart(req, res);
    });
  } else {
    console.log(
      "Request Type:" + req.method + " Invalid Endpoint: " + reqUrl.pathname
    );
    service.invalidRequest(req, res);
  }
});
