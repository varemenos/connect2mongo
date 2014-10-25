var BPromise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var Logger = require('mongodb').Logger;

/**
 * Establish connection to a MongoDB database
 * @param   {String} host       mongod Hostname
 * @param   {String} port       mongod Port
 * @param   {String} db         MongoDB Database
 * @param   {String} username   The Username for authentication
 * @param   {String} password   The Password for authentication
 * @resolve {Object} database   A MongoDB Connection Instance
 * @reject  {Error}  err        The Error Object
 */
exports.connect = function (host, port, db, username, password) {
    var fallback = function (value, fallback) {
        return value || fallback;
    };

    var genUser = function (username, password) {
        if (username && password) {
            return fallback(username) + ':' + fallback(password) + '@';
        } else {
            return false;
        }
    };

    var url = 'mongodb://' + fallback(genUser(username, password), '') + fallback(host, 'localhost') + ':' + fallback(port, 27017) + '/' + fallback(db, 'mydb');

    return new BPromise (function (resolve, reject) {
        MongoClient.connect(url, function (err, database) {
            if (err) {
                reject(err);
            } else {
                Logger.setLevel('info');

                Logger.setCurrentLogger(function (msg, context) {
                    console.log(msg);
                    console.log(context);
                });

                resolve(database);
            }
        });
    });
};

/**
 * Disconnect from a MongoDB Donnection Instance
 * @param  {Object}     db  A MongoDB Connection Instance
 * @return {undefined}
 */
exports.disconnect = function (db) {
    if (db) {
        db.close();
    } else {
        throw new Error('nothing to disconnect');
    }
};
