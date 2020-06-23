const jwt = require('jsonwebtoken');

exports.verifyJwt = async function(req,res) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  let decoded = null;
  console.log(`Token is ${token}`);
  if (token == null || token == undefined || token == "") {
    res.statusCode = 401;
    res.writeHead(401, {'Content-type': 'application/json', "Access-Control-Allow-Origin": "*"});
    res.end(JSON.stringify({'code': 401, 'description': 'user needs to be logged in'}));
  }
  else {
    decoded = new Promise((resolve, reject) => {
      resolve(jwt.verify(token, "secret", (err, data) => {
        if (err) {
          res.statusCode = 401;
          res.end();
        }
        console.log("DECODED from middle = ", data);
        return data;
      }));
    });
    console.log(decoded);
  }
  return decoded;
}
