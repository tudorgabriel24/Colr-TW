const mysql = require("mysql");
const crypto = require("crypto");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "colr",
});

function query(sql) {
    conn.query(sql, function(err, results, fields) {
        if (err) {
            throw err;
        }
        console.log(results);
    });
    // conn.connect(function(err) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Connected!");
    //     conn.query(sql, function(err, result) {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log("Result: " + result);
    //     });
    // });
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

function insertArticle(userId, name, year, brand, alcoholic, country, description, currentState) {
    const articleHash = crypto.createHash("md5");
    const hash = crypto.createHash("md5");
    articleHash.update(Date.now().toString());
    var articleID = articleHash.digest('hex');
    var articleSQL = `INSERT INTO articles(ID, name, year, brand, alcoholic, country, description, currentState) VALUES ('${articleID}', '${name}', ${year}, '${brand}', ${alcoholic}, '${country}', '${description}', '${currentState}')`;
    console.log(articleSQL);
    query(articleSQL);
    articleHash.end();
    hash.update(Date.now().toString());
    var bondSQL = `INSERT INTO users_articles(ID, id_user, id_article) VALUES('${hash.digest('hex')}', '${userId}', '${articleID}');`;
    console.log(bondSQL);
    query(bondSQL);
    hash.end();

}

function insertUser(admin, fullName, email, password) {
    const idHash = crypto.createHash("md5");
    idHash.update(Date.now().toString());
    const passHash = crypto.createHash("sha256");
    passHash.update(password);
    var userSQL = `INSERT INTO users(ID, admin, fullName, email, password) VALUES('${idHash.digest('hex')}', ${admin}, '${fullName}', '${email}', '${passHash.digest('hex')}')`;
    console.log(userSQL);
    query(userSQL);
    idHash.end();
    passHash.end();
}

// insert('articles', {'brand': 'cuca cola', 'year': 1998});

// insertUser(0, 'Ciocan Dragos', 'dragos@ciocan.com', '1234');

insertArticle('67ad7c87fde38897fa717203061a6149', 'capac', 2000, 'pepsy', 0, 'Romania', 'un capac din 2000', 'ruginit');

