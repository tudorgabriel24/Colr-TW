
const verifyJwt = require('./jwtMiddleware').verifyJwt;

let getAllUsers = async function () {
  let usersQuery = `SELECT ID,email,fullName FROM USERS`;
  let usersQueryPromise = new Promise((resolve, reject) => {
    connection.query(usersQuery, (err, result) => {
      if (err) reject(err);
      let dbUsers = [];
      console.log(result);
      if (result[0] === undefined) {
        console.log("there are no users saved in database");
      } else {
        for(let index = 0; index < result.length; index++) {
          dbUsers.push({
            ID: result[0].ID,
            email: result[0].email,
            fullName: result[0].fullName,
          })
        }
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
      let responseBody = [];
      let adminData = await verifyJwt(res,req);
      if(adminData !== null || adminData !== undefined) {
        if(adminData.admin === true) {
          responseBody = await getAllUsers();
          success = true;
        }
      }
      headers = {... headers, Authorization: `Bearer ${req.headers.authorization}` }
      responseBody.push({
        success: success
      });
      console.log(responseBody);
      res.writeHead(success ? 200 : 401, headers);
      res.write(JSON.stringify(responseBody));
      res.end();
    } catch (err) {
      console.log(err);
    }
  });

}