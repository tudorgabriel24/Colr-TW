const mysql = require("mysql");
const crypto = require("crypto");

var conn = require('./project-node-app/server').connection;

function query(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err, results, fields) {
            if (err) {
                reject({'status': 404, 'description': err});

                // throw err;
            }
            console.log(results, fields);
            resolve(results);
        });
    });
}

async function insertEntry(table, jsonData) {
    var insert = [];
    var columns = []
    for (var key in jsonData) {
        insert.push(`'${jsonData[key]}'`);
        columns.push(`${key}`);
    }
    inser = insert.join();
    columns = columns.join();
    var insSQL = `INSERT INTO ${table}(${columns}) VALUES (${insert})`;
    return await query(insSQL);
}

exports.insertEntry = insertEntry;


async function updateEntry(table, jsonData, entryId) {
    var update = [];
    for (var key in jsonData) {
        update.push(`${key} = '${jsonData[key]}'`);
    }

    update = update.join();

    var updateSQL = `UPDATE '${table}' SET ${update} WHERE ID = '${entryId}'`;
    return await query(updateSQL);
}

exports.updateEntry = updateEntry;


async function deleteEntry(table, id) {
    return await query(`DELETE FROM '${table}' WHERE ID = '${id}'`);
}

exports.deleteEntry = deleteEntry;

function deleteAllArticles() {
    conn.query(`SELECT ID FROM articles`, function(err, results, fields) {
        for (var i in results) {
            query(`DELETE FROM articles WHERE ID = '${results[i]['ID']}'`);
        }
    });
}

async function getEntries(table, jsonData, orderColumn) {
    var get = [];
    for (var key in jsonData) {
        get.push(`${key} = '${jsonData[key]}'`);
    }
    get = get.join(' AND ');
    var selectSQL = `SELECT * FROM ${table} WHERE ${get} ORDER BY 1`;
    var res = await query(selectSQL);
    return res;
}

exports.getEntries = getEntries;


