'use strict';

let Post = require('../models/post');

class PostRepository{

  createPost(data, cb, errCb){
    let newPost = new Post({
      'title': data.title,
      'content': data.content,
      'author': data.author
    });
    newPost.save(err => {
      if(err){
        errCb(err);
      }
      cb(`post created by : ${data.author}`);
    });
  }

  findByAuthor(memberId, cb, errCb){
    Post.find({'author': memberId}, (err, data) => {
      if(err){
        errCb(err);
      }
      cb(data);
    });
  }

  findAll(cb, errCb){
    Post.find({}, (err, data) => {
      if(err){
        errCb(err);
      }
      cb(data);
    });
  }

}

module.exports = PostRepository;
