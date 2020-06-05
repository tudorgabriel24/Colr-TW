const mysql = require("mysql");
const crypto = require("crypto");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "colr",
});

function query(sql) {
    conn.connect(function(err) {
        if (err) {
            throw err;
        }
        console.log("Connected!");
        conn.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            console.log("Result: " + result);
        });
    });
}

function insert(table, jsonData) {
    var colums = [];
    var values = [];
    var hasID = false;
    const hash = crypto.createHash("md5");
    for (var key in jsonData) {
        colums.push(key);
        if (key == "ID") {
            hash.update(Date.now().toString());
            values.push("'" + hash.digest('hex') + "'");
            hasID = true;
        }
        else {
            values.push("'" + jsonData[key] + "'");
        }
    }
    if (hasID == false) {
        colums.push("ID");
        hash.update(Date.now().toString());
        values.push("'" + hash.digest('hex') + "'");
    }

    hash.end();

    colums = colums.join();
    values = values.join();
    console.log(colums, values);
    
    var sql = `INSERT INTO ${table} (${colums}) VALUES (${values})`;
    console.log(sql);
    query(sql);
    
}

insert('articles', {'brand': 'cuca cola', 'year': 1998});