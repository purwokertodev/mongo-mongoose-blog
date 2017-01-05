'use strict';

let Member = require('../models/member');
let LoginModel = require('../models/login_model');

class MemberRepository{

  constructor(){

  }

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
      } else {
        if(!data[0]){
          cb(null);
        }else{
          let m = data[0];
          let loginModel = new LoginModel(m._id, m.full_name, m.username, m.password, m.profile_picture, m.created_at, m.updated_at);
          cb(loginModel);
        }
      }
    });
  }

}

module.exports = MemberRepository;
