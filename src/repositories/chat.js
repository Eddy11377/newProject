const chatModel = require('../models/chat');
const database = [];

class ChatRepository {
    constructor(database) {
        this.database = database;
        this.id = 1;
    }

    getChats(offset = 0, limit = 10) {
        return this.database.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
    }

    getChat(first_participant, second_participant) {
        const { id } = this.database.find(el => (String(el.first_participant) === String(first_participant) && String(el.second_participant) === String(second_participant)) || ((String(el.first_participant) === String(second_participant) && String(el.second_participant) === String(first_participant))))
        return { id: id }
    }

    createChat(first_participant, second_participant) {
        const chat = new chatModel(this.id, first_participant, second_participant);
        this.id += 1;
        this.database.push(chat)
        return { id: chat.id }
    }
}

module.exports = new ChatRepository(database);