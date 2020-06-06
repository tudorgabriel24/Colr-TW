const fs = require("fs").promises;
const http = require("http");

let userExist = async (user, searchType) => {
  console.log(searchType);
  let db = await fs.readFile("./db.json");
  db = JSON.parse(db.toString());
    for(let userIndex = 0; userIndex < db.users.length; userIndex ++) {
      if(db.users[userIndex].username === user.username) {
        if(searchType === "register") {
          console.log("found")
          return true;
        } 
        if(db.users[userIndex].password === user.password) {
            console.log(db.users[userIndex].password === user.password);
            return true;
          }
        }
      }
    return false;
}

const start = async () => {
  try {
    const server = http.createServer((req, res) => {
      if (req.method === "POST" && req.url === "/login") {
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
          body = JSON.parse(body);
          let exist = await userExist(body,"login");
          if(exist) {
            console.log("am ajuns aici" + userExist(body,"login"));
            response = {
              success: true,
            };
          }
          res.statusCode = response.success ? 200 : 404;
          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify(response));
          res.end();
        })

      } else if (req.method === "POST" && req.url === "/register") {
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
            let db = await fs.readFile("./db.json");
            db = JSON.parse(db);
            db.users.push(body);
            await fs.writeFile("./db.json", JSON.stringify(db, null, 2));
          }

          res.setHeader("Content-Type", "application/json");
          res.write(JSON.stringify({
            status: message
          }));
          res.end();
        })
      } else {
        res.statusCode = 200;
        res.write("Hello word!");
        res.end();
      }
    });

    server.listen(8000, () => console.log("Server listening on port 8000"));
  } catch (error) {
    console.error(error);
  }
};

start();