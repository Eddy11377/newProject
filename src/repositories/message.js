const messageModel = require('../models/message');
const database = [];

class MessageRepository {
    constructor(database) {
        this.database = database;
        this.id = 1;
    }
    createMessage(text, author, chat_id) {
        const message = new messageModel(this.id, text, author, chat_id, new Date())
        this.database.push(message)
        this.id += 1
        return { id: message.id }
    }

    getMessages(chat_id) {
        return this.database.filter((message) => {
            return Number(chat_id) === Number(message.chat_id)
        })

    }

}

module.exports = new MessageRepository(database)




