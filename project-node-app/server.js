//App
const hostname = "127.0.0.1";
const port = 3000;

const server = require("./controllers/controller");
var mysql = require("mysql");



var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "colr",
  charset: "utf8_general_ci",
});

server.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    module.exports = {
      connection
    }
  });
});
