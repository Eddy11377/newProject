module.exports = class User {
  constructor(username, password, tokens, settings) {
    this.username = username;
    this.password = password;
    this.tokens = tokens;
    this.settings = settings;
  }
};