module.exports = class Comment {
  constructor(id, username, postId, text) {
    this.id = id;
    this.username = username;
    this.postId = postId;
    this.text = text;
  }
};
