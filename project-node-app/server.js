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
// console.log(connection.state);
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
exports.connection = connection;

server.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);
  // connection.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  //   module.exports = {
  //     connection
  //   }
    // insertion =
    //   "INSERT INTO articles(id, brand, year, name) VALUES ( '30', 'Timisoreana', '2008','Beer Bottle')";

    // connection.query(insertion, function (err, result) {
    //   if (err) throw err;
    //   console.log("Result: " + JSON.parse(result));
    // });
  // });
});
