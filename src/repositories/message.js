const messageModel = require('../db/models/message');

class MessageRepository {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async createMessage(text, author, chatId) {
        return this.messageModel.create({
            text,
            author,
            chatId
        })
    }

    async getMessagesByChatId(chatId) {
        return this.messageModel.findAll({
            where: {
                chatId
            }
        })
    }

    async getMessages(offset = 0, limit = 50) {
        return this.messageModel.findAll({
            offset,
            limit
        })
    }

}

module.exports = new MessageRepository(messageModel)




