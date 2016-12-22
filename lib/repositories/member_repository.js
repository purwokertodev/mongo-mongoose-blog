'use strict';

let Member = require('../models/member');

class MemberRepository{

  createMember(data, cb, errCb){
    let newMember = new Member({
      'full_name' : data.full_name,
      'username' : data.username,
      'password' : data.password,
      'profile_picture': data.profile_picture
    });
    newMember.save((err) => {
      if(err){
        errCb(err);
      }
      cb('user created');
    });
  }

  findById(id, cb, errCb){
    Member.find({'_id': id}, (err, data) => {
      if(err){
        errCb(err);
      }
      cb(data[0]);
    });
  }

  findByEmail(email, cb, errCb){
    Member.find({'username': email}, (err, data) => {
      if(err){
        errCb(err);
      }
      cb(data);
    });
  }

}

module.exports = MemberRepository;
