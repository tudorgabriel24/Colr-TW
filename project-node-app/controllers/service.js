//API
const url = require("url");
var utils = require('../../util.js');
var db = require('../../asd.js');

exports.sampleRequest = function (req, res) {
  const reqUrl = url.parse(req.url, true);
  var name = "World";
  if (reqUrl.query.name) {
    name = reqUrl.query.name;
  }
  var response = {
    text: "Hello" + name,
  };
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

exports.addArticle = function (req, res) {
  var jsonData = {
      'user_id': req.session.user,
      'name': req.body.name,
      'year': req.body.year
  }
  db.insertEntry(`'articles'`, jsonData).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.addUser = function (req, res) {
  var jsonData = {

  };
  db.insertEntry(`'users'`, jsonData).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.addToCart = function (req, res) {
  var jsonData = {
    
  };
  db.insertEntry(`'user_articles'`, jsonData).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.updateUser = function (req, res) {
  var jsonData = {

  };
  db.updateEntry(`'users'`, req.body, req.session.id).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.updateArticle = function (req, res) {
  var jsonData = {

  };
  db.updateEntry(`'articles'`, req.body, req.params.articleId).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.getArticles = function (req, res) {
  var jsonData = {

  };
  db.getEntries(`'articles'`, jsonData, req.params.order).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.getUsers = function (req, res) {
  var jsonData = {

  };
  db.getEntries(`'users'`, jsonData, req.params.order).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
};

exports.deleteArticle = function (req, res) {
  db.deleteEntry(`'articles'`, req.body.articleId).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
}

exports.deleteUser = function (req, res) {
  db.deleteEntry(`'users'`, req.session.id).then(function(response) {
      utils.writeJson(res, response);
  }).catch(function(response) {
      utils.writeJson(res, response);
  });
}

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
