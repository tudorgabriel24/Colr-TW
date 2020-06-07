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
        // return results;
    });
    return 2;
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
    var articleSQL = `INSERT INTO articles(ID, user_id, name, year, brand, alcoholic, country, description, currentState) VALUES ('${articleID}', '${userId}', '${name}', ${year}, '${brand}', ${alcoholic}, '${country}', '${description}', '${currentState}')`;
    query(articleSQL);
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

function updateUser(userId, fullName, email, password) {
    var update = [];
    if (fullName != null) {
        update.push(`fullName = '${fullName}'`);
    }
    if (email != null) {
        update.push(`email = '${email}`);
    }
    if (password != null) {
        const hash = crypto.createHash("sha256");
        hash.update(password);
        update.push(`password = '${hash.digest('hex')}`);
    }

    if (update.length == 0) {
        return;
    }

    update = update.join();

    var updateSQL = `UPDATE users SET ${update} WHERE ID = '${userId}'`;

    console.log(updateSQL);

    query(updateSQL);
}

function updateArticle(articleId, name, year, brand, alcoholic, country, description, currentState) {
    var update = [];
    if (name != null) {
        update.push(`name = '${name}'`);
    }
    if (year != null) {
        update.push(`year = '${year}'`);
    }
    if (brand != null) {
        update.push(`brand = '${brand}'`);
    }
    if (alcoholic != null) {
        update.push(`alcoholic = '${alcoholic}'`);
    }
    if (country != null) {
        update.push(`country = '${country}'`);
    }
    if (description != null) {
        update.push(`description = '${description}'`);
    }
    if (currentState != null) {
        update.push(`currentState = '${currentState}'`);
    }

    if (update.length == 0) {
        return;
    }

    update = update.join();

    var updateSQL = `UPDATE articles SET ${update} WHERE ID = '${articleId}'`;

    query(updateSQL);
}



function deleteUser(userId) {
    query(`DELETE FROM users WHERE ID = '${userId}'`);
}

function deleteArticle(articleId) {
    query(`DELETE FROM articles WHERE ID = '${articleId}'`);
}

function deleteEntry(table, id) {
    query(`DELETE FROM '${table}' WHERE ID = '${id}'`);
}

// insert('articles', {'brand': 'cuca cola', 'year': 1998});

// insertUser(0, 'asd', 'marina@marian.com', '12345');

insertArticle('b8ad2480f1870d522629cabd378ae122', 'mare capac', 2002, 'timisoreana', 0, 'Romania', 'bere pet', 'sters');

// updateUser('67ad7c87fde38897fa717203061a6149', null, null, null);

// console.log(query(`SELECT * FROM users`));

// deleteUser('67ad7c87fde38897fa717203061a6149');

