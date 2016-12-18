'use strict';

let db = require('../config/mongo');

let memberSchema = new db.schema({
  user_id:Number,
  full_name: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true}
});

let Member = db.con.model('members', memberSchema);

module.exports = Member;
