'use strict';

let MemberRepository = require('../repositories/member_repository');
let PostRepository = require('../repositories/post_repository');
let CommentRepository = require('../repositories/comment_repository');

function saveMember(req, res, next){
  if(!req.body){
    next('all fields are required..');
  }
  let data = req.body;
};

function getMember(req, res, next){
  let userId = req.params.member_id;
  let memberRepo = new MemberRepository();
  memberRepo.findById(userId, data => {
    res.send(data);
  }, err => {
    next(err);
  });
};

function createPost(req, res, next){
  if(!req.body){
    next('all field are required..');
  }
  let data = req.body;
  let postRepo = new PostRepository();
  postRepo.createPost(data, result => {
    res.send(result);
  }, err => {
    next(err);
  })
};

function getPostByMember(req, res, next){
  if(!req.params){
    next('cannot find params');
  }
  let memberId = req.params.member_id;
  let postRepo = new PostRepository();
  postRepo.findByAuthor(memberId, data => {
    res.send(data);
  }, err => {
    next(err);
  });
};

function getCommentByPost(req, res, next){
  if(!req.params){
    next('cannot find params');
  }
  let postId = req.params.post_id;
  let commentRepo = new CommentRepository();
  commentRepo.findByPost(postId, data => {
    res.send(data);
  }, err => {
    next(err);
  });
}

module.exports = {
  saveMember: saveMember,
  getMember: getMember,
  createPost: createPost,
  getPostByMember: getPostByMember,
  getCommentByPost: getCommentByPost
};
