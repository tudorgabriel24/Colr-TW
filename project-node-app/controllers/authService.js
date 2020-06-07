// const url = require("url");
const crypto = require("crypto");
const connection = require("../server").connection;
let userExist = async (user, searchType) => {
  console.log(searchType);
  let userQuery = `SELECT * FROM USERS WHERE EMAIL= '${user.email}';`;
  let connectionPromise = new Promise((resolve, reject) => {
    connection.query(userQuery, (err, result) => {
      if (err) throw err;

      if(result[0] === undefined) console.log('user doesn t exist');
      else {
          if(searchType === "register") {
            console.log("User exists in database, failed to register.")
           resolve(true);
          } 
          const hashPass = crypto.createHash("sha256");
          hashPass.update(user.password);
          if(result[0].password === hashPass.digest('hex')) {
              resolve(true);
            }
      }
      resolve(false);
    });
  }); 
  return connectionPromise; 
}

function query(sql) {
  connection.query(sql, function(err, results, fields) {
      if (err) {
          throw err;
      }
      console.log(results, "user added");
  });
}

function insertUser(admin, fullName, email, password) {
  const idHash = crypto.createHash("md5");
  idHash.update(Date.now().toString());
  const passHash = crypto.createHash("sha256");
  passHash.update(password);
  let userSQL = `INSERT INTO users(ID, admin, fullName, email, password) VALUES('${idHash.digest('hex')}', ${admin}, '${fullName}', '${email}', '${passHash.digest('hex')}')`;
  console.log(userSQL);
  query(userSQL);
  idHash.end();
  passHash.end();
}

exports.loginRequest = async(req, resp) => {
  // const reqUrl = url.parse(req.url, true);
  let response = {
    success: false,
  };
  let body = '';

  req.on('data', data => {
    console.log("req daata")
    body += data;
      if (body.length > 1e6)
          req.connection.destroy();
  });

  req.on('end', async () => {
    try {
      body = JSON.parse(body);
      let exist = await userExist(body,"login");
      if(exist) {
        response = {
          success: true,
        };
      }
      resp.statusCode = response.success ? 200 : 404;
      resp.setHeader("Content-Type", "application/json");
      resp.write(JSON.stringify(response));
      resp.end();
    }
    catch(err) {
      console.log(err);
    }
  });
}

exports.registerRequest = function(req, res) {
  let body = ''
  req.on('data', data => {
    body += data
  })

  req.on('end', async () => {
    body = JSON.parse(body);
    let exist = await userExist(body, "register");
    let message = "user created!"
    if(exist) {
      res.statusCode = 409;
      message = "user already exist!"
    } else {
      res.statusCode = 201;
      insertUser(0,body.fullName, body.email, body.password);
    }

    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify({
      status: message
    }));
    res.end();
  })
}
