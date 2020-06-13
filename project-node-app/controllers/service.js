//API
const url = require("url");
var utils = require("../../util.js");
var db = require("./asd.js");
const crypto = require("crypto");
const fs = require("fs");
const { assert } = require("console");
const util = require("util");
const { verifyJwt } = require("./jwtMiddleware.js");
const jwtVerify = require('./jwtMiddleware').verifyJwt;
const verifyJwt = require('./jwtMiddleware').verifyJwt;

exports.addArticle = async function (req, res) {
  var jsonData = req.body;
  const decoded = await jwtVerify(req, res);
  if (decoded == null) {
    utils.writeJson(res, {'code': 403, 'description': `can't upload articles if you are not logged in`});
  }
  const hash = crypto.createHash("md5");
  hash.update(Date.now().toString());
  jsonData["ID"] = hash.digest("hex");
  jsonData["user_id"] = decoded;

  db.insertEntry("articles", jsonData)
    .then(function (response) {
      fs.readFile(jsonData.imagePath, function (err, data) {
        fs.writeFile(`./images/${jsonData["ID"]}`, data, function (err) {
          if (err) {
            utils.writeJson(res, {
              code: 405,
              description: err,
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

exports.addToCart = async function (req, res) {le: req.body.articleId,
  let decoded = await verifyJwt(req,res);

  var jsonData = {
    id_user: decoded.id,
    id_article: req.body.id_article,
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
  var jsonData = req.body;
  if (jsonData == undefined) {
    db.getArticles()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
  var order;
  if (jsonData.hasOwnProperty('order')) {
    order = jsonData['order'];
    delete jsonData['order'];
  }
  else {
    order = 'views'
  }

  db.getEntries('articles', jsonData, order)
    .then(function (response) {
      utils.writeJson(res, response);
      console.log(response);
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

console.log('asd');

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

exports.getCart = async function (req, res) {
  let decoded = await verifyJwt(req,res);
  var jsonData = {
    id_user: decoded.id
  };

  db.getEntries("user_articles", jsonData, 1)
    .then(function (response) {
      console.log(response);
      if (response.length == 0) {
        utils.writeJson(res, {'code': 204, 'description': 'user has no items in cart'});
      }
      var chek = [];
      for(var key in response) {
        
        chek.push(`'${response[key]['id_article']}'`);
      }
      chek = chek.join(',');
      console.log(chek);
      db.getCart(chek)
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

exports.deletFromCart = async function (req, res) {
  var jsonData = req.body;
  console.log("JSON",jsonData);
  let decoded = await verifyJwt(req, res);
  jsonData['id_user'] = decoded.id;
  db.deleteFromCart(jsonData['id_user'], jsonData['id_article'])
    .then(function (response) {
      utils.writeJson(response, {'code': 205, 'description': 'article successfuly removed from cart'});
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
