var Promise = require('bluebird');
var connection = require('./db');

var db = connection.connect();
db.then(function (db) {
    'use strict';
    getAll('testData').then(function (documents) {
        console.log(documents);
        connection.disconnect(db);
    });
});

var getAll = function (collection) {
    'use strict';

    return new Promise(function (resolve, reject) {
        var col = db.collection(collection);

        col.find().toArray(function (err, documents) {
            if (err) {
                reject(err);
            } else {
                resolve(documents);
            }
        });
    });
};
