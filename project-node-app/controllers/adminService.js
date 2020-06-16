
const verifyJwt = require('./jwtMiddleware').verifyJwt;
const connection = require('../server').connection;

let getAllUsers = async function () {
  let usersQuery = `SELECT email,fullName FROM USERS`;
  let usersQueryPromise = new Promise((resolve, reject) => {
    connection.query(usersQuery, (err, result) => {
      if (err) reject(err);
      let dbUsers = [];
      console.log(result);
      if (result[0] === undefined) {
        console.log("there are no users saved in database");
      } else {
        dbUsers = result;
      }
      resolve(dbUsers);
    });
  });

  return usersQueryPromise;
}

exports.getUsers = async function(req, res, headers) {
  let success = false;
  let body = "";

  req.on("data", (data) => {
    console.log("req daata");
    body += data;
    if (body.length > 1e6) req.connection.destroy();
  });
  
  req.on("end", async () => {
    try {
      let responseBody = {
        users: [],
        success: false
      };
      let adminData = await verifyJwt(req,res);
      console.log(adminData);
      if(adminData !== null || adminData !== undefined) {
        if(adminData.admin === true) {
          responseBody.users = await getAllUsers();
          responseBody.success = true;
        }
      }
      headers = {... headers, Authorization: `Bearer ${req.headers.authorization}` }
      console.log(responseBody);
      res.writeHead(success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    } catch (err) {
      console.log(err);
    }
  });
}