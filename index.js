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
        connection.disconnect(db);
    });

/**
 * Get all the Documents of a MongoDB Collection
 * @param   {String} collection     The MongoDB Collection name
 * @resolve {Array}  documents      The Documents of that collection
 * @reject  {Error}  err            The Error Object
 */
var getAll = function (collection) {
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

/**
 * Clear all Documents of a MongoDB Collection
 * @param   {String} collection     The MongoDB Collection name
 * @resolve {Object} removed        The Documents removed
 * @reject  {Error}  err            The Error Object
 */
var clearAll = function (collection) {
    return new BPromise(function (resolve, reject) {
        var col = db.collection(collection);

        col.remove({}, function (err, removed) {
            if (err) {
                reject(err);
            } else {
                resolve(removed);
            }
        });
    });
};

/**
 * Inserts Documents into a MongoDB Collection
 * @param   {String} collection The MongoDB Collection name
 * @param   {Object} data       The Documents to be inserted
 * @resolve {Object} results    The results
 * @reject  {Error}  err        The Error Object
 */
var insertInto = function (collection, data) {
    return new BPromise(function (resolve, reject) {
        var col = db.collection(collection);

        col.insert(data, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};
