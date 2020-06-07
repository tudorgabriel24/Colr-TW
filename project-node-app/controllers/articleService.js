//API
const url = require("url");
const jwt = require('jsonwebtoken');

exports.sampleRequest = function (req, res) {
  const reqUrl = url.parse(req.url, true);
  var name = "World";
  let response;
  if (reqUrl.query.name) {
    name = reqUrl.query.name;
  }
  const reqToken = req.headers.authorization;
  // console.log(req);
  try {
    var decoded = jwt.verify(reqToken, 'secret');
    response = {
      success: true,
      text: "Hello" + decoded._id
    };
    res.statusCode = 200;
    res.setHeader("Authorization", reqToken);
  } catch(err) {
    console.log(err);
    response = {
      success: false,
      message: err
    };
    res.statusCode = 401;
  }
  res.setHeader("Content-Type", "application/json");
  
  res.end(JSON.stringify(response));
};

exports.testRequest = function (req, res) {
  body = "";

  req.on("data", function (chunk) {
    body += chunk;
  });

  req.on("end", function () {
    postBody = JSON.parse(body);

    var response = {
      text: "Post Request Value is  " + postBody.value,
    };

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  });
};

exports.invalidRequest = function (req, res) {
  res.statusCode = 404;
  res.setHeader = ("Content-Type", "text/plain");
  res.end("Invalid Request");
};
