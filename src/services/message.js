const messageRepository = require('../repositories/message');

class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async createMessage(text, author, chatId) {
        try {
            const createdMsg = await this.messageRepository.createMessage(text, author, chatId);
            return createdMsg
        } catch (error) {
            console.log(error);
            throw new Error('не удалось создать сообщение')
        }
    }

    async getMessages(offset, limit) {
        try {
            const messages = await this.messageRepository.getMessages(offset, limit)
            return messages
        } catch (error) {
            console.log(error);
            throw new Error('не удалось получить сообщения')
        }
    }

    async getMessagesByChatId(chatId) {
        try {
            const messagesByChatId = await this.messageRepository.getMessagesByChatId(chatId)
            return messagesByChatId
        } catch (error) {
            console.log(error);
            throw new Error('не удалось получить сообщения по chatId')
        }
    }
}

module.exports = new MessageService(messageRepository)