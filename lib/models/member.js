'use strict';

let db = require('../config/mongo');

let memberSchema = new db.schema({
  full_name: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  profile_picture: {type: String, require: true},
  created_at: Date,
  updated_at: Date
});

memberSchema.pre('save', function(next){
  let currentDate = new Date();
  this.updated_at = currentDate;

  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

let Member = db.con.model('members', memberSchema);

module.exports = Member;
