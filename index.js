var BPromise = require('bluebird');
var connection = require('./db');

var db;

connection.connect()
    .then(function (database) {
        'use strict';

        db = database;

        return getAll('testData');
    })
    .then(function (documents) {
        console.log(documents);
        connection.disconnect(db);
    });

var getAll = function (collection) {
    'use strict';

    return new BPromise(function (resolve, reject) {
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

var clearAll = function (collection) {
    'use strict';

    return new BPromise(function (resolve, reject) {
        var col = db.collection(collection);

        // REMOVE
        collection.remove({}, function (err, removed) {
            if (err) {
                reject(err);
            } else {
                resolve(removed);
            }
        });
    });
};
