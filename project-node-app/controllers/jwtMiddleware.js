const jwt = require('jsonwebtoken');

exports.verifyJwt = async function(req,res) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  let decoded = null;
  console.log(token);
  if (token == null) {
    res.statusCode = 401;
    res.end();
    return decoded;
  }
  else {
    let decoded = new Promise((resolve, reject) => {
      resolve(jwt.verify(token, "secret", (err, data) => {
        if (err) {
          res.statusCode = 401;
          res.end();
        }
        console.log("DECODED from middle = ", data);
        return data;
      }));
    });
    return decoded; 
}
}
