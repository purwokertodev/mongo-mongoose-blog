'use strict';

let Member = require('../models/member');

function saveMember(req, res, next){
  if(!req.body){
    next('all field are required..');
  }
  let newMember = new Member({
    "user_id" : parseInt(req.body.user_id),
    "full_name" : req.body.full_name,
    "username" : req.body.username,
    "password" : req.body.password
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
  let userId = parseInt(req.params.user_id);
  Member.find({"user_id": userId}, (err, members) => {
    res.send({data: members});
  });
};

module.exports = {
  saveMember: saveMember,
  getMembers: getMembers,
  getMember: getMember
};
