var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;

exports.connect = function (host, port, db) {
    'use strict';

    var fallback = function (value, fallback) {
        return value || fallback;
    };

    var url = 'mongodb://' + fallback(host, 'localhost') + ':' + fallback(port, 27017) + '/' + fallback(db, 'mydb');

    return new Promise (function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
};

exports.disconnect = function (db) {
    'use strict';

    if (db) {
        db.close();
    }
};

exports.insertSample = function () {
    'use strict';
    var collection = db.collection('testData');
    var sampleData = require('./sample.js').data;

    // REMOVE
    collection.remove({}, function (err, removed) {
    });

    // INSERT
    collection.insert(sampleData, function (err, results) {
    });

    // GET
    collection.find().toArray(function (err, docs) {
        if (err) {
            console.log(err.message);
        } else {
            console.log(docs);
        }
    });
};
