'use strict';

let PostRepository = require('../repositories/post_repository');
let CommentRepository = require('../repositories/comment_repository');

function saveMember(req, res, next){
  if(!req.body){
    next('all fields are required..');
  }
  let data = req.body;
};


function getPosts(req, res, next){
  let postRepo = new PostRepository();
  postRepo.findAll(data => {
    console.log(data);
    res.render('index', {title: 'Posts', posts: data})
  }, err => {
    next(err);
  });
};

module.exports = {
  getPosts: getPosts
};
