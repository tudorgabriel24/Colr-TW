const verifyJwt = require("./jwtMiddleware").verifyJwt;
const connection = require("../server").connection;
const url = require("url");

let getAllUsers = async function () {
  let usersQuery = `SELECT email,fullName FROM USERS`;
  let usersQueryPromise = new Promise((resolve, reject) => {
    connection.query(usersQuery, (err, result) => {
      if (err) reject(err);
      let dbUsers = [];
      if (result[0] === undefined) {
        console.log("there are no users saved in database");
      } else {
        dbUsers = result;
      }
      resolve(dbUsers);
    });
  });

  return usersQueryPromise;
};

let getUserArticles = async function (id) {
  let articlesQuery = `SELECT * FROM ARTICLES WHERE user_id = '${id}'`;
  let articlesQueryPromise = new Promise((resolve, reject) => {
    connection.query(articlesQuery, (err, result) => {
      if (err) {
        console.log(err);
        resolve(null);
      }
      let dbArticles = [];
      if (result[0] === undefined) {
        console.log("this user has no articles");
      } else {
        dbArticles = result;
      }
      resolve(dbArticles);
    });
  });

  return articlesQueryPromise;
};

let getUserIdByEmail = async function (email) {
  let usersQuery = `SELECT ID FROM USERS WHERE email = '${email}'`;
  let usersQueryPromise = new Promise((resolve, reject) => {
    connection.query(usersQuery, (err, result) => {
      if (err) {
        console.log(err);
        resolve(null);
      }
      let dbUsers = [];
      if (result[0] === undefined) {
        console.log("user doesn`t exist");
      } else {
        dbUsers = result[0];
      }
      resolve(dbUsers);
    });
  });

  return usersQueryPromise;
};

let deleteUser = async function (email) {
  console.log("DELETED EMAIL = ", email);
  let deleteQuery = `DELETE FROM users WHERE email = '${email}'`;
  let deleteQueryPromise = new Promise((resolve, reject) => {
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      }

      resolve(true);
    });
  });

  return deleteQueryPromise;
};

let deleteArticle = async function (id) {
  console.log("DELETED ID = ", id);
  let deleteQuery = `DELETE FROM articles WHERE id = '${id}'`;
  let deleteQueryPromise = new Promise((resolve, reject) => {
    connection.query(deleteQuery, (err, result) => {
      if (err) {
        console.log(err);
        resolve(false);
      }
      resolve(true);
    });
  });

  return deleteQueryPromise;
};

let updateArticleDB = async function (article) {
  article = JSON.parse(article);
  let updateArticleQuery = `UPDATE articles SET name = '${article.name}', description = '${article.description}', currentState = '${article.currentState}', country = '${article.country}', priceRange = '${article.priceRange}', year = ${article.year}, type = '${article.type}', alcoholic = '${article.alcoholic}' WHERE ID = '${article.ID}';`;
  console.log(updateArticleQuery);
  let updateArticleQueryPromise = new Promise ((resolve,reject) => {
    connection.query(updateArticleQuery, (err,result) => {
      if(err) {
        console.log(err);
        resolve(false);
      }
      resolve(true);
    })
  });
  return updateArticleQueryPromise;
};

exports.getUsers = async function (req, res, headers) {
  let body = "";

  req.on("data", (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on("end", async () => {
    try {
      let responseBody = {
        users: [],
        success: false,
      };
      let adminData = await verifyJwt(req, res);
      if (adminData !== null || adminData !== undefined) {
        if (adminData.admin === true) {
          responseBody.users = await getAllUsers();
          responseBody.success = true;
          headers = { ...headers, Authorization: req.headers.authorization };
        }
      }
      res.writeHead(responseBody.success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    } catch (err) {
      console.log(err);
    }
  });
};

exports.deleteUser = async function (req, res, headers) {
  var body = "";
  req.on("data", (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on("end", async () => {
    try {
      let user = JSON.parse(body);
      let responseBody = {
        message: "User cannot be deleted!",
        success: false,
      };
      let adminData = await verifyJwt(req, res);
      if (adminData !== null || adminData !== undefined) {
        if (adminData.admin === true) {
          let dbResponse = await deleteUser(user.email);
          if (dbResponse === true) {
            responseBody.message = "User has been deleted";
            responseBody.success = true;
          }
        }
      }
      headers = {
        ...headers,
        Authorization: `Bearer ${req.headers.authorization}`,
      };
      res.writeHead(responseBody.success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    } catch (err) {
      console.log(err);
    }
  });
};

exports.getUserArticles = async function (req, res, headers) {
  const reqUrl = url.parse(req.url, true);
  let body = "";

  req.on("data", (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on("end", async () => {
    try {
      let email = reqUrl.query.email;
      let user = await getUserIdByEmail(email);
      let responseBody = {
        success: false,
        message: "Error",
      };
      if (user.ID !== null) {
        let userArticles = await getUserArticles(user.ID);
        if (userArticles !== null) {
          responseBody = {
            success: true,
            articles: userArticles,
          };
        }
      }

      headers = {
        ...headers,
        Authorization: `Bearer ${req.headers.authorization}`,
      };
      res.writeHead(responseBody.success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    } catch (err) {
      console.log(err);
    }
  });
};

exports.deleteUserArticles = async function (req, res, headers) {
  var body = "";
  req.on("data", (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on("end", async () => {
    try {
      const reqUrl = url.parse(req.url, true);
      let id = reqUrl.query.id;
      let responseBody = {
        message: "Article cannot be deleted!",
        success: false,
      };
      let adminData = await verifyJwt(req, res);
      if (adminData !== null || adminData !== undefined) {
        if (adminData.admin === true && (id !== undefined && id !== null)) {
          let dbResponse = await deleteArticle(id);
          if (dbResponse === true) {
            responseBody.message = "Article has been deleted";
            responseBody.success = true;
          }
        }
      }
      headers = {
        ...headers,
        Authorization: `Bearer ${req.headers.authorization}`,
      };
      res.writeHead(responseBody.success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    } catch (err) {
      console.log(err);
    }
  });
};

exports.updateArticle = async function (req, res, headers) {
  var body = "";
  req.on("data", (data) => {
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });

  req.on("end", async () => {
    try {
      let responseBody = {
        message: "Article cannot be edited!",
        success: false,
      };

      let adminData = await verifyJwt(req, res);
      if (adminData !== null || adminData !== undefined) {
        if (adminData.admin === true && (body !== null && body !== {})) {
          let dbResponse = await updateArticleDB(body);
          if (dbResponse === true) {
            responseBody.message = "Article has been updated";
            responseBody.success = true;
          }
        }
      }
      headers = {
        ...headers,
        Authorization: `Bearer ${req.headers.authorization}`,
      };
      console.log(responseBody);
      res.writeHead(responseBody.success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    }
    catch(err) {
      console.log(err);
    }
  });
}
