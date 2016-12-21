'use strict';

let db = require('../config/mongo');

let commentSchema = new db.schema({
  post_id: db.schema.ObjectId,
  author: {type: String, required: true},
  content: {type: String, required: true},
  created_at: Date
});

commentSchema.pre('save', function(next){
  let currentDate = new Date();
  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
});

let Comment = db.con.model('comments', commentSchema);

module.exports = Comment;
