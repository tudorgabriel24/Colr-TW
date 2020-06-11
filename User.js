var utils = require('./util.js');
var db = require('./asd.js');


function addArticle(req, res, next) {
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
}

function addUser(req, res, next) {
    var jsonData = {
        'email': req.body.email,
        'password': req.body.password
    }
    db.insertEntry(`'users'`, jsonData).then(function(response) {
        utils.writeJson(res, response);
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function addToCart(req, res, next) {
    var jsonData = {
        'id_user': req.session.user,
        'id_article': req.body.idArticle
    }

    db.insertEntry(`'user_articles'`, jsonData).then(function(response) {
        utils.writeJson(res, response);
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function updateUser(req, res, next) {
    
    db.updateEntry('users', req.body, req.session.id).then(function(response) {
        utils.writeJson(res, response);
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function updateArticle(req, res, next) {
    var jsonData = {
        'brand': req.body.brand,
        'name': req.body.name
    }

    db.updateEntry('articles', jsonData, req.body.articleId).then(function(response) {
        utils.writeJson(res, response);
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function deleteUser(req, res, next) {
    db.deleteEntry('users', req.session.id).then(function(response) {
        utils.writeJson(res, response); 
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function deleteArticle(req, res, next) {
    db.deleteEntry('articles', req.body.articleId).then(function(response) {
        utils.writeJson(res, response); 
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function deleteFromCart(req, res, next) {
    db.deleteEntry('user_articles', req.body.cartArticleId).then(function(response) {
        utils.writeJson(res, response); 
    }).catch(function(response) {
        utils.writeJson(res, response);
    });
}

function getUsers(req, res, next) {
    var jsonData = {

    }
    db.getEntries('users', )
}