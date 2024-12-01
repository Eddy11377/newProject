module.exports = class Message {
    constructor(id, text, author, chat_id, created_at) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.chat_id = chat_id;
        this.created_at = created_at;
    }
}