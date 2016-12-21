'use strict';

let Member = require('../models/member');
let Post = require('../models/post');
let Comment = require('../models/comment');

function saveMember(req, res, next){
  if(!req.body){
    next('all fields are required..');
  }
  let data = req.body;
  let newMember = new Member({
    'full_name' : data.full_name,
    'username' : data.username,
    'password' : data.password,
    'profile_picture': data.profile_picture
  });

  newMember.save((err) => {
    if(err){
      next(err);
    }
    res.send('user created');
  });
};

function getMembers(req, res, next){
  Member.find({}, (err, members) => {
    res.send({data: members});
  });
};

function getMember(req, res, next){
  let userId = req.params.user_id;
  Member.find({'_id': userId}, (err, member) => {
    res.send({data: member});
  });
};

function createPost(req, res, next){
  if(!req.body){
    next('all field are required..');
  }
  let data = req.body;
  let newPost = new Post({
    'title': data.title,
    'content': data.content,
    'author': data.author
  });
  newPost.save(err => {
    if(err){
      next(err);
    }
    res.send(`post created by : ${data.author}`);
  });
};

module.exports = {
  saveMember: saveMember,
  getMembers: getMembers,
  getMember: getMember,
  createPost: createPost
};
