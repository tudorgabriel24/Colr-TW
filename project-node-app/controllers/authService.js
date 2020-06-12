// const url = require("url");
const crypto = require("crypto");
const connection = require("../server").connection;
console.log(connection);
const jwt = require("jsonwebtoken");

let userExist = async (user) => {
  let userQuery = `SELECT * FROM USERS WHERE EMAIL= '${user.email}';`;
  let connectionPromise = new Promise((resolve, reject) => {
    connection.query(userQuery, (err, result) => {
      if (err) reject(err);
      let dbUser = null;
      if (result[0] === undefined) {
        console.log("user doesn t exist");
      } else {
        dbUser = {
          ID: result[0].ID,
          email: result[0].email,
          fullName: result[0].fullName,
          password: result[0].password,
        };
      }
      resolve(dbUser);
    });
  });
  return connectionPromise;
};

function query(sql) {
  connection.query(sql, function (err, results, fields) {
    if (err) {
      throw err;
    }
    console.log(results, "user added");
  });
}

function insertUser(fullName, email, password) {
  const idHash = crypto.createHash("md5");
  idHash.update(Date.now().toString());
  let userSQL = `INSERT INTO users(ID, fullName, email, password) VALUES('${idHash.digest(
    "hex"
  )}', '${fullName}', '${email}', '${password}')`;
  console.log(userSQL);
  query(userSQL);
  idHash.end();
  passHash.end();
}

function createToken(userData) {
  const jwtExpirySeconds = 60 * 60 * 24;
  console.log("USERDATA= ", userData);
  const token = jwt.sign({ id: userData.ID }, "secret", {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  return token;
}

exports.loginRequest = async (req, resp, headers) => {
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

  req.on("end", async () => {
    try {
      body = JSON.parse(body);
      let userData = await userExist(body, "login");
      console.log(userData);
      if (userData !== null) {
        if (body.password === userData.password) {
          response = {
            success: true,
          };
          const token = createToken(userData);
          headers = { ...headers, Authorization: `Bearer ${token}` };
        }
      }

      resp.writeHead(response.success ? 200 : 404, headers);
      resp.write(JSON.stringify(response));
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
    let exist = await userExist(body, "register");
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
