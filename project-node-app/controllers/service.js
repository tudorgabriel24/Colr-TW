//API
const url = require("url");
var utils = require("../../util.js");
var db = require("../../asd.js");
const crypto = require("crypto");
const fs = require("fs");
const { assert } = require("console");
const util = require("util");

// exports.sampleRequest = function (req, res) {
//   const reqUrl = url.parse(req.url, true);
//   var name = "World";
//   if (reqUrl.query.name) {
//     name = reqUrl.query.name;
//   }
//   var response = {
//     text: "Hello" + name,
//   };
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify(response));
// };

exports.addArticle = function (req, res, files) {
  var jsonData = req.body;
  const hash = crypto.createHash("md5");
  hash.update(Date.now().toString());
  jsonData["ID"] = hash.digest("hex");
  jsonData["user_id"] = "f87330d93a88e085a5c9946d93c2bd9d"; //req.session.id;

  // console.log(jsonData);
  console.log(files.image);
  var asd = fs.readFile(files.image.path, function (err, data) {
    fs.writeFile(`./images/${jsonData["ID"]}`, data, function () {
      console.log("asddd");
      utils.writeJson(res, { code: 200 });
    });
  });

  db.insertEntry("articles", jsonData)
    .then(function (response) {
      fs.readFile(files.image.path, function (err, data) {
        fs.writeFile(`./images/${jsonData["ID"]}`, data, function (err) {
          if (err) {
            utils.writeJson(res, {
              code: 405,
              description: "unkown file type",
            });
          }
          utils.writeJson(res, {
            code: 201,
            description: "article added with success",
          });
        });
      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.addUser = function (req, res) {
  var jsonData = {};
  db.insertEntry("users", jsonData)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.addToCart = function (req, res) {
  var jsonData = {
    id_user: req.session.id,
    id_article: req.body.articleId,
  };
  db.insertEntry("user_articles", jsonData)
    .then(function (response) {
      utils.writeJson(res, {
        code: 201,
        description: "article succesfully added to cart",
      });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.updateUser = function (req, res) {
  var jsonData = req.body;
  db.updateEntry("users", req.body, req.session.id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.updateArticle = function (req, res) {
  var jsonData = req.body;
  var articleId = jsonData.articleId;
  delete jsonData["articleId"];
  if (jsonData["user_id"] != req.session.id) {
    utils.writeJson(res, {
      code: 402,
      description: `trying to modify other people's articles`,
    });
  }
  db.updateEntry("articles", jsonData, articleId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getArticles = function (req, res) {
  db.getArticles()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getUsers = function (req, res) {
  var jsonData = req.body;
  var order;
  if ("orderBy" in jsonData) {
    order = jsonData["orderBy"];
    delete jsonData["orderBy"];
  } else {
    order = 1;
  }
  db.getEntries(`'users'`, jsonData, order)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.deleteArticle = function (req, res) {
  if (req.body.user_id != req.session.id) {
    utils.writeJson(res, {
      code: 400,
      description: `can't delete what's not yours`,
    });
  }
  db.deleteEntry("articles", req.body.articleId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.deleteUser = function (req, res) {
  db.deleteEntry("users", req.session.id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getCart = function (req, res) {
  var jsonData = {
    id_user: "f87330d93a88e085a5c9946d93c2bd9d",
  };
  db.getEntries("user_articles", jsonData, 1)
    .then(function (response) {
      db.getEntries("articles", { id_user: response.id_user })
        .then(function (rezponze) {
          utils.writeJson(res, rezponze);
        })
        .catch(function (rezponze) {
          utils.writeJson(res, rezponze);
        });
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.invalidRequest = function (req, res) {
  res.statusCode = 404;
  res.setHeader = ("Content-Type", "text/plain");
  res.end("Invalid Request");
};
