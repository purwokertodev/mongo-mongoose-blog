'use strict';

let Comment = require('../models/comment');

class CommentRepository{

  createComment(data, cb, errCb){
    let newComment = new Comment({
      'post_id': data.post_id,
      'author': data.author,
      'content': data.content
    });
    newComment.save(err => {
      if(err){
        errCb(err);
      }
      cb('new comment added..');
    });
  }

  findByPost(postId, cb, errCb){
    Comment.find({'post_id': postId}, (err, data) => {
      if(err){
        errCb(err);
      }
      cb(data);
    });
  }
}

module.exports = CommentRepository;
