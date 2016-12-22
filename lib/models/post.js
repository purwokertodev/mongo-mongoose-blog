'use strict';

let db = require('../config/mongo');
let Member = require('./member.js');

let postSchema = new db.schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: db.schema.ObjectId,
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

postSchema.pre('find', function(next){
  Member.find({'author': this.author}, (err, data) => {
    this.author = data[0];
    console.log(this.author);
    console.log('preee finddddddddddddddd');
  });
  next();
});

let Post = db.con.model('posts', postSchema);

module.exports = Post;
