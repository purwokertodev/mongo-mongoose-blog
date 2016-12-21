'use strict';

let Member = require('../models/member');

function saveMember(req, res, next){
  if(!req.body){
    next('all field are required..');
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
  let userId = parseInt(req.params.user_id);
  Member.find({'user_id': userId}, (err, members) => {
    res.send({data: members});
  });
};

module.exports = {
  saveMember: saveMember,
  getMembers: getMembers,
  getMember: getMember
};
