const { where } = require('sequelize');
const messageModel = require('../db/models/message');

class MessageRepository {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async createMessage(text, author, chatId) {
        // const message = new messageModel(this.id, text, author, chat_id, new Date())
        // this.database.push(message)
        // this.id += 1
        // return { id: message.id }
        return await this.messageModel.create({
            text: text,
            author: author,
            chatId: chatId
        })
    }

    async getMessagesByChatId(chatId) {
        // return this.database.filter((message) => {
        //     return Number(chat_id) === Number(message.chat_id)
        // })

        return await this.messageModel.findAll({
            where: {
                chat_id: chatId
            }
        })
    }

    async getMessages(offset = 0, limit = 50) {
        // return this.database.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
        return await this.messageModel.findAll({
            offset: offset,
            limit: limit
        })
    }

}

module.exports = new MessageRepository(messageModel)




