connect2mongo
=============

A library to help your node.js application connect to mongodb


### Example

```js
var connection = require('connect2mongo/db');
var query = require('connect2mongo/query');
var sampleData = require('connect2mongo/sample').data;
var db;

connection.connect()
    .then(function (database) {
        db = database;

        return query.clearAll(db, 'test');
    })
    .then(function (removed) {
        return query.insertInto(db, 'test', sampleData);
    })
    .then(function (results) {
        return query.getAll(db, 'test');
    })
    .then(function (documents) {
        console.log(documents);
        connection.disconnect(db);
    });
```
