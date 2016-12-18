'use strict';

let mongoose = require('mongoose');
let promise = require('bluebird');

let uri = 'mongodb://Wuriyanto:1003040005Wuriyanto@localhost:27017/db_app1';
mongoose.Promise = promise;
let connection = mongoose.createConnection(uri);

module.exports = {
  con: connection,
  schema: mongoose.Schema
};
