'use strict';

class LoginModel{

  constructor(id, fullName, username, password, profilePicture, createdAt, updatedAt){
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.password = password;
    this.profilePicture = profilePicture;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isValidPassword(password){
    return this.password === password;
  }
}

module.exports = LoginModel;
