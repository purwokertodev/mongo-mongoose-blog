'use strict';

let db = require('../config/mongo');
let Member = require('./member.js');

let postSchema = new db.schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    _id: db.schema.ObjectId,
    full_name: String,
    profile_picture: String,
    created_at: Date,
    updated_at: Date
  },
  created_at: Date,
  updated_at: Date
});

postSchema.pre('save', function(next){
  let currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

let Post = db.con.model('posts', postSchema);

module.exports = Post;
