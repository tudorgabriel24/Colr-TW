// const url = require("url");
const crypto = require("crypto");
const mysql = require("mysql");
const connection = require("../server").connection;
const jwt = require("jsonwebtoken");

let userExist = async (user) => {
  console.log(user);
  let userQuery = `SELECT * FROM USERS WHERE EMAIL= '${user.email}';`;
  let userQueryPromise = new Promise((resolve, reject) => {
    connection.query(userQuery, (err, result) => {
      if (err) reject(err);
      let dbUser = null;
      console.log(result);
      if (result[0] === undefined) {
        console.log("user doesn t exist");
      } else {
        dbUser = {
          ID: result[0].ID,
          email: result[0].email,
          fullName: result[0].fullName,
          password: result[0].password,
          admin: false
        };
      }
      resolve(dbUser);
    });
  });

  return userQueryPromise;
};

let adminExist = async (admin) => {
  console.log(admin);
  let adminDataQuery = `SELECT * FROM ADMINS WHERE EMAIL = '${admin.email}'`;
  let adminQueryPromise = new Promise((resolve, reject) => {
    connection.query(adminDataQuery, (err, result) => {
      if (err) reject(err);
      let dbAdminData = null;
      if (result[0] === undefined) {
        console.log("admin doesn t exist");
      } else {
        dbAdminData = {
          ID: result[0].ID,
          email: result[0].email,
          fullName: result[0].fullName,
          password: result[0].password,
          admin: true
        };
      }
      resolve(dbAdminData);
    });
  });
  return adminQueryPromise;
}

function query(sql) {
  connection.query(sql, function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results, "user added");
  });
}

function insertUser(fullName, email, password) {
  let userSQL = `INSERT INTO users(fullName, email, password) VALUES('${fullName}', '${email}', '${password}')`;
  console.log(userSQL);
  query(userSQL);
}

function createToken(userData) {
  // const jwtExpirySeconds = 60 * 60 * 24;
  console.log("USERDATA= ", userData);
  const token = jwt.sign({ id: userData.ID, admin: userData.admin }, "secret", {
    algorithm: "HS256",
    // expiresIn: jwtExpirySeconds,
  });
  return token;
}

exports.loginRequest = async (req, resp, headers) => {
  console.log("HEADERS", headers);
  // const reqUrl = url.parse(req.url, true);
  let response = {
    success: false,
  };
  let body = "";

  req.on("data", (data) => {
    console.log("req daata");
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });
  
  const encodePassword = (password) => {
      const hash = crypto.createHash("sha256");
      hash.update(password);
      return hash.digest('hex');
  }

  let setHeaderLogin = (userData, headers) => {
    response = {
      success: true,
      admin: userData.admin
    };
    const token = createToken(userData);
    console.log(headers);
    headers = {
      ...headers,
      'Authorization': 'Bearer ' + token
    }
    console.log(headers);
    return headers;

  }

  req.on("end", async () => {
    try {
      body = JSON.parse(body);
      let userSearch = await userExist(body);
      console.log(userSearch);
      const passwordEncoded = encodePassword(body.password)
      if (userSearch !== null && userSearch !== undefined) {
        if (passwordEncoded === userSearch.password) {
          headers = setHeaderLogin(userSearch, headers);
        }
      }
      else {
        let adminSearch = await adminExist(body);
        if(adminSearch !== null && adminSearch !== undefined) {
          if (passwordEncoded === adminSearch.password) {
            headers = setHeaderLogin(adminSearch, headers);
          }
        }
      }
      console.log(response);
      resp.writeHead(response.success ? 200 : 404, headers);
      resp.write(JSON.stringify(response));
      console.log(headers);
      resp.end();
    } catch (err) {
      console.log(err);
    }
  });
};

exports.registerRequest = function (req, res, headers) {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    body = JSON.parse(body);
    console.log(body);
    let exist = await userExist(body);
    let message = "user created!";
    if (exist) {
      message = "user already exist!";
    } else {
      insertUser(body.fullName, body.email, body.password);
    }
    res.writeHead(exist ? 409 : 201, headers);

    res.write(
      JSON.stringify({
        status: message,
      })
    );
    res.end();
  });
};
