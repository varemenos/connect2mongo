var BPromise = require('bluebird');
var connection = require('./db');
var sampleData = require('./sample').data;
var db;

connection.connect()
    .then(function (database) {
        db = database;

        return clearAll('mydb');
    })
    .then(function (removed) {
        return insertInto('mydb', sampleData);
    })
    .then(function (results) {
        return getAll('mydb');
    })
    .then(function (documents) {
        console.log(documents);
    });

var getAll = function (col) {
    return new BPromise(function (resolve, reject) {
        var collection = db.collection(col);

        collection.find().toArray(function (err, documents) {
            if (err) {
                reject(err);
            } else {
                resolve(documents);
            }
        });
    });
};

var clearAll = function (col) {
    return new BPromise(function (resolve, reject) {
        var collection = db.collection(col);

        collection.remove({}, function (err, removed) {
            if (err) {
                reject(err);
            } else {
                resolve(removed);
            }
        });
    });
};

var insertInto = function (col, data) {
    return new BPromise(function (resolve, reject) {
        var collection = db.collection(col);

        collection.insert(data, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
