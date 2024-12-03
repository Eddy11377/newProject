const messageRepository = require('../repositories/message');

class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    async createMessage(text, author, chatId) {
        try {
            return await this.messageRepository.createMessage(text, author, chatId)
        } catch (error) {
            console.log(error);
            throw new Error('не удалось создать сообщение')
        }
    }

    async getMessages(chatId, offset, limit) {
        try {
            if (chatId) {
                return await this.messageRepository.getMessagesByChatId(chatId)
            } else {
                return await this.messageRepository.getMessages(offset, limit)
            }

        } catch (error) {
            console.log(error);
            throw new Error('не удалось получить сообщения')
        }
    }
}

module.exports = new MessageService(messageRepository)