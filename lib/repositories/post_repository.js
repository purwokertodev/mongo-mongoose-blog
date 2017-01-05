'use strict';

let Post = require('../models/post');
let MemberRepository = require('./member_repository');

class PostRepository{

  constructor(){

  }

  createPost(data, cb, errCb){
    let memberRepo = new MemberRepository();
    memberRepo.findById(data.author, memberData => {
      let newPost = new Post({
        'title': data.title,
        'content': data.content,
        'author': {
          '_id': memberData._id,
          'full_name': memberData.full_name,
          'profile_picture': memberData.profile_picture,
          'created_at': memberData.created_at,
          'updated_at': memberData.updated_at
        }
      });
      newPost.save(err => {
        if(err){
          errCb(err);
        }
        cb(`post created by : ${data.author}`);
      });
    }, err => {
      errCb(err);
    });
  }

  findByAuthor(memberId, cb, errCb){
    Post.find({'author._id': memberId}, (err, data) => {
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
