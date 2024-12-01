const messageRepository = require('../repositories/message');

class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }

    createMessage(text, author, chat_id) {
        try {
            return this.messageRepository.createMessage(text, author, chat_id)
        } catch (error) {
            console.log(error);
            throw new Error('не удалось создать сообщение')
        }
    }

    getMessages(chat_id, offset, limit) {
        try {
            if(chat_id) {
                return this.messageRepository.getMessagesByChatId(chat_id)
            } else {
                return this.messageRepository.getMessages(offset, limit)
            }
            
        } catch (error) {
            console.log(error);
            throw new Error('не удалось получить сообщения')
        }
    }
}

module.exports = new MessageService(messageRepository)